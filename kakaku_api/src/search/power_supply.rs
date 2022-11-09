use crate::models::power_supply;
use crate::models::prelude::PowerSupply;
use crate::search_error::SearchError;
use sea_orm::{EntityTrait, QueryFilter};

use sea_orm::{entity::*, query::*};

use super::search::SortOrder;
use crate::db;
use std::result::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchPowerSupplyParameter {
    pub search_text: String,
    pub sort_order: SortOrder,
    pub maker_name: String,
    pub form_factor: String,
    pub capacity: i32,
    pub eighty_plus_certification: String,
    pub cpu_connector_count: Option<i32>,
    pub eight_pin_connector_count: Option<i32>,
    pub min_price: Option<i32>,
    pub max_price: Option<i32>,
}

pub async fn search_power_supply(
    search_power_supply_parameter: SearchPowerSupplyParameter,
) -> Result<Vec<power_supply::Model>, SearchError> {
    let search_words: Vec<&str> = search_power_supply_parameter
        .search_text
        .trim()
        .split_whitespace()
        .collect();
    let mut searched_power_supplies =
        PowerSupply::find().filter(power_supply::Column::IsExist.eq(true));
    let mut name_condition = Condition::any();
    for word in search_words {
        name_condition = name_condition.add(power_supply::Column::Name.contains(word));
    }
    searched_power_supplies = searched_power_supplies.filter(name_condition);

    if !search_power_supply_parameter.maker_name.trim().is_empty() {
        searched_power_supplies = searched_power_supplies.filter(
            power_supply::Column::MakerName.eq(search_power_supply_parameter.maker_name.trim()),
        );
    }
    if !search_power_supply_parameter.form_factor.trim().is_empty() {
        searched_power_supplies = searched_power_supplies.filter(
            power_supply::Column::FormFactor
                .contains(search_power_supply_parameter.form_factor.trim()),
        );
    }
    if search_power_supply_parameter.capacity != 0 {
        searched_power_supplies = searched_power_supplies
            .filter(power_supply::Column::Capacity.gte(search_power_supply_parameter.capacity));
    }
    if !search_power_supply_parameter
        .eighty_plus_certification
        .trim()
        .is_empty()
    {
        searched_power_supplies = searched_power_supplies.filter(
            power_supply::Column::EightyPlusCertification.eq(search_power_supply_parameter
                .eighty_plus_certification
                .trim()),
        );
    }

    if let Some(cpu_connector_count) = search_power_supply_parameter.cpu_connector_count {
        searched_power_supplies = searched_power_supplies
            .filter(power_supply::Column::CpuConnectorCount.gte(cpu_connector_count))
    }
    if let Some(eight_pin_connector_count) = search_power_supply_parameter.eight_pin_connector_count
    {
        searched_power_supplies = searched_power_supplies
            .filter(power_supply::Column::EightPinConnectorCount.gte(eight_pin_connector_count))
    }

    if let Some(max_price) = search_power_supply_parameter.max_price {
        searched_power_supplies =
            searched_power_supplies.filter(power_supply::Column::Price.lte(max_price));
    }
    if let Some(min_price) = search_power_supply_parameter.min_price {
        searched_power_supplies =
            searched_power_supplies.filter(power_supply::Column::Price.gte(min_price));
    }

    searched_power_supplies = match search_power_supply_parameter.sort_order {
        SortOrder::PriceAsc => searched_power_supplies.order_by_asc(power_supply::Column::Price),
        SortOrder::PriceDesc => searched_power_supplies.order_by_desc(power_supply::Column::Price),
        SortOrder::RankAsc => {
            searched_power_supplies.order_by_asc(power_supply::Column::PopularRank)
        }
        SortOrder::ReleaseDateDesc => {
            searched_power_supplies.order_by_desc(power_supply::Column::ReleaseDate)
        }
    };
    let db = db::create_db_connection().await?;

    Ok(searched_power_supplies.all(&db).await?)
}
