use crate::models::cpu;
use crate::models::prelude::Cpu;
use crate::search_error::SearchError;
use sea_orm::{EntityTrait, QueryFilter};

use sea_orm::{entity::*, query::*};

use super::search::SortOrder;
use crate::db;
use std::result::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchCpuParameter {
    pub item_ids: Vec<String>,
    pub search_text: String,
    pub sort_order: SortOrder,
    pub maker_name: String,
    pub socket_name: String,
    pub min_price: Option<i32>,
    pub max_price: Option<i32>,
}

pub async fn search_cpu(
    search_cpu_parameter: SearchCpuParameter,
) -> Result<Vec<cpu::Model>, SearchError> {
    let search_words: Vec<&str> = search_cpu_parameter
        .search_text
        .trim()
        .split_whitespace()
        .collect();
    let mut searched_cpus = Cpu::find().filter(cpu::Column::IsExist.eq(true));

    if !search_cpu_parameter.item_ids.is_empty() {
        searched_cpus =
            searched_cpus.filter(cpu::Column::ItemId.is_in(search_cpu_parameter.item_ids));
    }

    let mut name_condition = Condition::any();
    for word in search_words {
        name_condition = name_condition.add(cpu::Column::Name.contains(word));
    }
    searched_cpus = searched_cpus.filter(name_condition);

    if !search_cpu_parameter.maker_name.trim().is_empty() {
        searched_cpus =
            searched_cpus.filter(cpu::Column::MakerName.eq(search_cpu_parameter.maker_name.trim()));
    }
    if !search_cpu_parameter.socket_name.trim().is_empty() {
        searched_cpus = searched_cpus
            .filter(cpu::Column::SocketName.eq(search_cpu_parameter.socket_name.trim()));
    }

    if let Some(max_price) = search_cpu_parameter.max_price {
        searched_cpus = searched_cpus.filter(cpu::Column::Price.lte(max_price));
    }
    if let Some(min_price) = search_cpu_parameter.min_price {
        searched_cpus = searched_cpus.filter(cpu::Column::Price.gte(min_price));
    }

    searched_cpus = match search_cpu_parameter.sort_order {
        SortOrder::PriceAsc => searched_cpus.order_by_asc(cpu::Column::Price),
        SortOrder::PriceDesc => searched_cpus.order_by_desc(cpu::Column::Price),
        SortOrder::RankAsc => searched_cpus
            .filter(cpu::Column::PopularRank.is_not_null())
            .order_by_asc(cpu::Column::PopularRank),
        SortOrder::ReleaseDateDesc => searched_cpus.order_by_desc(cpu::Column::ReleaseDate),
    };
    let db = db::create_db_connection().await?;

    Ok(searched_cpus.all(&db).await?)
}
