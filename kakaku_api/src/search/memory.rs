use crate::models::memory;
use crate::models::prelude::Memory;
use crate::search_error::SearchError;
use sea_orm::{EntityTrait, QueryFilter};

use sea_orm::{entity::*, query::*};

use super::search::SortOrder;
use crate::db;
use std::result::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchMemoryParameter {
    pub search_text: String,
    pub sort_order: SortOrder,
    pub maker_name: String,
    pub capacity_per_module: i32,
    pub module_count: i32,
    pub interface: String,
    pub memory_type: String,
    pub module_type: String,
    pub min_price: Option<i32>,
    pub max_price: Option<i32>,
}

pub async fn search_memory(
    search_memory_parameter: SearchMemoryParameter,
) -> Result<Vec<memory::Model>, SearchError> {
    let search_words: Vec<&str> = search_memory_parameter
        .search_text
        .trim()
        .split_whitespace()
        .collect();
    let mut searched_memories = Memory::find().filter(memory::Column::IsExist.eq(true));
    let mut name_condition = Condition::any();
    for word in search_words {
        name_condition = name_condition.add(memory::Column::Name.contains(word));
    }
    searched_memories = searched_memories.filter(name_condition);

    if !search_memory_parameter.maker_name.trim().is_empty() {
        searched_memories = searched_memories
            .filter(memory::Column::MakerName.eq(search_memory_parameter.maker_name.trim()));
    }
    if search_memory_parameter.capacity_per_module != 0 {
        searched_memories = searched_memories.filter(
            memory::Column::CapacityPerModule.eq(search_memory_parameter.capacity_per_module),
        );
    }
    if search_memory_parameter.module_count != 0 {
        searched_memories = searched_memories
            .filter(memory::Column::ModuleCount.eq(search_memory_parameter.module_count));
    }
    if !search_memory_parameter.interface.trim().is_empty() {
        searched_memories = searched_memories
            .filter(memory::Column::Interface.eq(search_memory_parameter.interface.trim()));
    }
    if !search_memory_parameter.memory_type.trim().is_empty() {
        searched_memories = searched_memories
            .filter(memory::Column::MemoryType.eq(search_memory_parameter.memory_type.trim()));
    }
    if !search_memory_parameter.module_type.trim().is_empty() {
        searched_memories = searched_memories.filter(
            memory::Column::ModuleType.contains(search_memory_parameter.module_type.trim()),
        );
    }

    if let Some(max_price) = search_memory_parameter.max_price {
        searched_memories = searched_memories.filter(memory::Column::Price.lte(max_price));
    }
    if let Some(min_price) = search_memory_parameter.min_price {
        searched_memories = searched_memories.filter(memory::Column::Price.gte(min_price));
    }

    searched_memories = match search_memory_parameter.sort_order {
        SortOrder::PriceAsc => searched_memories.order_by_asc(memory::Column::Price),
        SortOrder::PriceDesc => searched_memories.order_by_desc(memory::Column::Price),
        SortOrder::RankAsc => searched_memories.order_by_asc(memory::Column::PopularRank),
        SortOrder::ReleaseDateDesc => searched_memories.order_by_desc(memory::Column::ReleaseDate),
    };
    let db = db::create_db_connection().await?;

    Ok(searched_memories.all(&db).await?)
}
