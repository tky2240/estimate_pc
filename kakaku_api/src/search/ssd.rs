use crate::models::prelude::Ssd;
use crate::models::ssd;
use crate::search_error::SearchError;
use sea_orm::{EntityTrait, QueryFilter};

use sea_orm::DatabaseConnection;
use sea_orm::{entity::*, query::*};

use super::search::SortOrder;

use std::result::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchSsdParameter {
    pub item_ids: Vec<String>,
    pub search_text: String,
    pub sort_order: SortOrder,
    pub maker_name: String,
    pub capacity: i32,
    pub interface: String,
    pub tbw: Option<i32>,
    pub min_price: Option<i32>,
    pub max_price: Option<i32>,
}

pub async fn search_ssd_from_ids(
    db: &DatabaseConnection,
    ssd_item_ids: Vec<String>,
) -> Result<Vec<ssd::Model>, SearchError> {
    let searched_ssd = Ssd::find().filter(ssd::Column::ItemId.is_in(ssd_item_ids));
    Ok(searched_ssd.all(db).await?)
}

pub async fn search_ssd(
    db: &DatabaseConnection,
    search_ssd_parameter: SearchSsdParameter,
) -> Result<Vec<ssd::Model>, SearchError> {
    let search_words: Vec<&str> = search_ssd_parameter
        .search_text
        .trim()
        .split_whitespace()
        .collect();
    let mut searched_ssds = Ssd::find().filter(ssd::Column::IsExist.eq(true));

    if !search_ssd_parameter.item_ids.is_empty() {
        searched_ssds =
            searched_ssds.filter(ssd::Column::ItemId.is_in(search_ssd_parameter.item_ids));
    }

    let mut name_condition = Condition::any();
    for word in search_words {
        name_condition = name_condition.add(ssd::Column::Name.contains(word));
    }
    searched_ssds = searched_ssds.filter(name_condition);

    if !search_ssd_parameter.maker_name.trim().is_empty() {
        searched_ssds =
            searched_ssds.filter(ssd::Column::MakerName.eq(search_ssd_parameter.maker_name.trim()));
    }
    if search_ssd_parameter.capacity != 0 {
        searched_ssds =
            searched_ssds.filter(ssd::Column::Capacity.gte(search_ssd_parameter.capacity));
    }
    if !search_ssd_parameter.interface.trim().is_empty() {
        searched_ssds = searched_ssds
            .filter(ssd::Column::Interface.contains(search_ssd_parameter.interface.trim()));
    }
    if let Some(tbw) = search_ssd_parameter.tbw {
        searched_ssds = searched_ssds.filter(ssd::Column::Tbw.gte(tbw));
    }
    if let Some(max_price) = search_ssd_parameter.max_price {
        searched_ssds = searched_ssds.filter(ssd::Column::Price.lte(max_price));
    }
    if let Some(min_price) = search_ssd_parameter.min_price {
        searched_ssds = searched_ssds.filter(ssd::Column::Price.gte(min_price));
    }

    searched_ssds = match search_ssd_parameter.sort_order {
        SortOrder::PriceAsc => searched_ssds.order_by_asc(ssd::Column::Price),
        SortOrder::PriceDesc => searched_ssds.order_by_desc(ssd::Column::Price),
        SortOrder::RankAsc => searched_ssds
            .filter(ssd::Column::PopularRank.is_not_null())
            .order_by_asc(ssd::Column::PopularRank),
        SortOrder::ReleaseDateDesc => searched_ssds.order_by_desc(ssd::Column::ReleaseDate),
    };

    Ok(searched_ssds.all(db).await?)
}
