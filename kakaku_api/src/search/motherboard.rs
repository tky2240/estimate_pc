use crate::models::motherboard;
use crate::models::prelude::Motherboard;
use crate::search_error::SearchError;
use sea_orm::{EntityTrait, QueryFilter};

use sea_orm::{entity::*, query::*};

use super::search::SortOrder;
use crate::db;
use std::result::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchMotherboardParameter {
    pub item_ids: Vec<String>,
    pub search_text: String,
    pub sort_order: SortOrder,
    pub maker_name: String,
    pub chipset: String,
    pub socket_name: String,
    pub form_factor: String,
    pub memory_type: String,
    pub min_price: Option<i32>,
    pub max_price: Option<i32>,
}

pub async fn search_motherboard_from_ids(
    motherboard_item_ids: Vec<String>,
) -> Result<Vec<motherboard::Model>, SearchError> {
    let db = db::create_db_connection().await?;
    let searched_motherboard =
        Motherboard::find().filter(motherboard::Column::ItemId.is_in(motherboard_item_ids));
    return Ok(searched_motherboard.all(&db).await?);
}

pub async fn search_motherboard(
    search_motherboard_parameter: SearchMotherboardParameter,
) -> Result<Vec<motherboard::Model>, SearchError> {
    let search_words: Vec<&str> = search_motherboard_parameter
        .search_text
        .trim()
        .split_whitespace()
        .collect();
    let mut searched_motherboards =
        Motherboard::find().filter(motherboard::Column::IsExist.eq(true));

    if !search_motherboard_parameter.item_ids.is_empty() {
        searched_motherboards = searched_motherboards
            .filter(motherboard::Column::ItemId.is_in(search_motherboard_parameter.item_ids));
    }

    let mut name_condition = Condition::any();
    for word in search_words {
        name_condition = name_condition.add(motherboard::Column::Name.contains(word));
    }
    searched_motherboards = searched_motherboards.filter(name_condition);

    if !search_motherboard_parameter.maker_name.trim().is_empty() {
        searched_motherboards = searched_motherboards.filter(
            motherboard::Column::MakerName.eq(search_motherboard_parameter.maker_name.trim()),
        );
    }
    if !search_motherboard_parameter.chipset.trim().is_empty() {
        searched_motherboards = searched_motherboards
            .filter(motherboard::Column::Chipset.eq(search_motherboard_parameter.chipset.trim()));
    }
    if !search_motherboard_parameter.socket_name.trim().is_empty() {
        searched_motherboards = searched_motherboards.filter(
            motherboard::Column::SocketName.eq(search_motherboard_parameter.socket_name.trim()),
        );
    }
    if !search_motherboard_parameter.form_factor.trim().is_empty() {
        searched_motherboards = searched_motherboards.filter(
            motherboard::Column::FormFactor.eq(search_motherboard_parameter.form_factor.trim()),
        );
    }
    if !search_motherboard_parameter.memory_type.trim().is_empty() {
        searched_motherboards = searched_motherboards.filter(
            motherboard::Column::MemoryType.eq(search_motherboard_parameter.memory_type.trim()),
        );
    }

    if let Some(max_price) = search_motherboard_parameter.max_price {
        searched_motherboards =
            searched_motherboards.filter(motherboard::Column::Price.lte(max_price));
    }
    if let Some(min_price) = search_motherboard_parameter.min_price {
        searched_motherboards =
            searched_motherboards.filter(motherboard::Column::Price.gte(min_price));
    }

    searched_motherboards = match search_motherboard_parameter.sort_order {
        SortOrder::PriceAsc => searched_motherboards.order_by_asc(motherboard::Column::Price),
        SortOrder::PriceDesc => searched_motherboards.order_by_desc(motherboard::Column::Price),
        SortOrder::RankAsc => searched_motherboards
            .filter(motherboard::Column::PopularRank.is_not_null())
            .order_by_asc(motherboard::Column::PopularRank),
        SortOrder::ReleaseDateDesc => {
            searched_motherboards.order_by_desc(motherboard::Column::ReleaseDate)
        }
    };
    let db = db::create_db_connection().await?;

    Ok(searched_motherboards.all(&db).await?)
}
