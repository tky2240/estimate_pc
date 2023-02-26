use crate::models::hdd;
use crate::models::prelude::Hdd;
use crate::search_error::SearchError;
use sea_orm::{EntityTrait, QueryFilter};

use sea_orm::DatabaseConnection;
use sea_orm::{entity::*, query::*};

use super::search::SortOrder;

use std::result::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchHddParameter {
    pub item_ids: Vec<String>,
    pub search_text: String,
    pub sort_order: SortOrder,
    pub maker_name: String,
    pub capacity: i32,
    pub write_style: String,
    pub min_price: Option<i32>,
    pub max_price: Option<i32>,
}

pub async fn search_hdd_from_ids(
    db: &DatabaseConnection,
    hdd_item_ids: Vec<String>,
) -> Result<Vec<hdd::Model>, SearchError> {
    let searched_hdd = Hdd::find().filter(hdd::Column::ItemId.is_in(hdd_item_ids));
    Ok(searched_hdd.all(db).await?)
}

pub async fn search_hdd(
    db: &DatabaseConnection,
    search_hdd_parameter: SearchHddParameter,
) -> Result<Vec<hdd::Model>, SearchError> {
    let search_words: Vec<&str> = search_hdd_parameter
        .search_text
        .trim()
        .split_whitespace()
        .collect();
    let mut searched_hdds = Hdd::find().filter(hdd::Column::IsExist.eq(true));

    if !search_hdd_parameter.item_ids.is_empty() {
        searched_hdds =
            searched_hdds.filter(hdd::Column::ItemId.is_in(search_hdd_parameter.item_ids));
    }

    let mut name_condition = Condition::any();
    for word in search_words {
        name_condition = name_condition.add(hdd::Column::Name.contains(word));
    }
    searched_hdds = searched_hdds.filter(name_condition);

    if !search_hdd_parameter.maker_name.trim().is_empty() {
        searched_hdds =
            searched_hdds.filter(hdd::Column::MakerName.eq(search_hdd_parameter.maker_name.trim()));
    }
    if search_hdd_parameter.capacity != 0 {
        searched_hdds =
            searched_hdds.filter(hdd::Column::Capacity.gte(search_hdd_parameter.capacity));
    }
    if !search_hdd_parameter.write_style.trim().is_empty() {
        searched_hdds = searched_hdds
            .filter(hdd::Column::WriteStyle.eq(search_hdd_parameter.write_style.trim()));
    }
    if let Some(max_price) = search_hdd_parameter.max_price {
        searched_hdds = searched_hdds.filter(hdd::Column::Price.lte(max_price));
    }
    if let Some(min_price) = search_hdd_parameter.min_price {
        searched_hdds = searched_hdds.filter(hdd::Column::Price.gte(min_price));
    }

    searched_hdds = match search_hdd_parameter.sort_order {
        SortOrder::PriceAsc => searched_hdds.order_by_asc(hdd::Column::Price),
        SortOrder::PriceDesc => searched_hdds.order_by_desc(hdd::Column::Price),
        SortOrder::RankAsc => searched_hdds
            .filter(hdd::Column::PopularRank.is_not_null())
            .order_by_asc(hdd::Column::PopularRank),
        SortOrder::ReleaseDateDesc => searched_hdds.order_by_desc(hdd::Column::ReleaseDate),
    };

    Ok(searched_hdds.all(db).await?)
}
