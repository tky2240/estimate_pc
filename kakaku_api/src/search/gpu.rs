use crate::models::gpu;
use crate::models::prelude::Gpu;
use crate::search_error::SearchError;
use sea_orm::{EntityTrait, QueryFilter};

use sea_orm::{entity::*, query::*};

use super::search::SortOrder;
use crate::db;
use std::result::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchGpuParameter {
    pub item_ids: Vec<String>,
    pub search_text: String,
    pub sort_order: SortOrder,
    pub maker_name: String,
    pub chip_name: String,
    pub gpu_memory_capacity: i32,
    pub is_low_profile: bool,
    pub cooling_solution: String,
    pub max_tdp: Option<i32>,
    pub min_price: Option<i32>,
    pub max_price: Option<i32>,
}

pub async fn search_gpu(
    search_gpu_parameter: SearchGpuParameter,
) -> Result<Vec<gpu::Model>, SearchError> {
    let search_words: Vec<&str> = search_gpu_parameter
        .search_text
        .trim()
        .split_whitespace()
        .collect();
    let mut searched_gpus = Gpu::find().filter(gpu::Column::IsExist.eq(true));

    let is_empty_item_ids = search_gpu_parameter.item_ids.is_empty();
    if !is_empty_item_ids {
        searched_gpus =
            searched_gpus.filter(gpu::Column::ItemId.is_in(search_gpu_parameter.item_ids));
    }

    let mut name_condition = Condition::any();
    for word in search_words {
        name_condition = name_condition.add(gpu::Column::Name.contains(word));
    }
    searched_gpus = searched_gpus.filter(name_condition);

    if !search_gpu_parameter.maker_name.trim().is_empty() {
        searched_gpus =
            searched_gpus.filter(gpu::Column::MakerName.eq(search_gpu_parameter.maker_name.trim()));
    }
    if !search_gpu_parameter.chip_name.trim().is_empty() {
        searched_gpus =
            searched_gpus.filter(gpu::Column::ChipName.eq(search_gpu_parameter.chip_name.trim()));
    }
    if search_gpu_parameter.gpu_memory_capacity != 0 {
        searched_gpus = searched_gpus
            .filter(gpu::Column::GpuMemoryCapacity.gte(search_gpu_parameter.gpu_memory_capacity))
    }
    if is_empty_item_ids {
        searched_gpus =
            searched_gpus.filter(gpu::Column::IsLowProfile.eq(search_gpu_parameter.is_low_profile));
    }
    if !search_gpu_parameter.cooling_solution.trim().is_empty() {
        searched_gpus = searched_gpus
            .filter(gpu::Column::CoolingSolution.eq(search_gpu_parameter.cooling_solution.trim()));
    }
    if let Some(max_tdp) = search_gpu_parameter.max_tdp {
        searched_gpus = searched_gpus.filter(gpu::Column::Tdp.lte(max_tdp));
    }
    if let Some(max_price) = search_gpu_parameter.max_price {
        searched_gpus = searched_gpus.filter(gpu::Column::Price.lte(max_price));
    }
    if let Some(min_price) = search_gpu_parameter.min_price {
        searched_gpus = searched_gpus.filter(gpu::Column::Price.gte(min_price));
    }

    searched_gpus = match search_gpu_parameter.sort_order {
        SortOrder::PriceAsc => searched_gpus.order_by_asc(gpu::Column::Price),
        SortOrder::PriceDesc => searched_gpus.order_by_desc(gpu::Column::Price),
        SortOrder::RankAsc => searched_gpus
            .filter(gpu::Column::PopularRank.is_not_null())
            .order_by_asc(gpu::Column::PopularRank),
        SortOrder::ReleaseDateDesc => searched_gpus.order_by_desc(gpu::Column::ReleaseDate),
    };
    let db = db::create_db_connection().await?;

    Ok(searched_gpus.all(&db).await?)
}
