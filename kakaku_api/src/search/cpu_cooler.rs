use crate::models::cpu_cooler;
use crate::models::cpu_cooler_socket;
use crate::models::prelude::CpuCooler;
use crate::models::prelude::CpuCoolerSocket;
use crate::search_error::SearchError;

use sea_orm::{EntityTrait, QueryFilter};

use sea_orm::{entity::*, query::*};

use super::search::SortOrder;
use crate::db;
use std::result::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchCpuCoolerParameter {
    pub item_ids: Vec<String>,
    pub search_text: String,
    pub sort_order: SortOrder,
    pub maker_name: String,
    pub socket_name: String,
    pub air_flow_type: String,
    pub height: Option<i32>,
    pub max_tdp: Option<i32>,
    pub min_price: Option<i32>,
    pub max_price: Option<i32>,
}

pub async fn search_cpu_cooler_from_ids(
    cpu_cooler_item_ids: Vec<String>,
) -> Result<Vec<cpu_cooler::Model>, SearchError> {
    let db = db::create_db_connection().await?;
    let searched_cpu_cooler =
        CpuCooler::find().filter(cpu_cooler::Column::ItemId.is_in(cpu_cooler_item_ids));
    return Ok(searched_cpu_cooler.all(&db).await?);
}

pub async fn search_cpu_cooler(
    search_cpu_cooler_parameter: SearchCpuCoolerParameter,
) -> Result<Vec<(cpu_cooler::Model, Vec<cpu_cooler_socket::Model>)>, SearchError> {
    let search_words: Vec<&str> = search_cpu_cooler_parameter
        .search_text
        .trim()
        .split_whitespace()
        .collect();
    let mut searched_cpu_coolers = CpuCooler::find().filter(cpu_cooler::Column::IsExist.eq(true));

    if !search_cpu_cooler_parameter.item_ids.is_empty() {
        searched_cpu_coolers = searched_cpu_coolers
            .filter(cpu_cooler::Column::ItemId.is_in(search_cpu_cooler_parameter.item_ids));
    }

    let mut name_condition = Condition::any();
    for word in search_words {
        name_condition = name_condition.add(cpu_cooler::Column::Name.contains(word));
    }
    searched_cpu_coolers = searched_cpu_coolers.filter(name_condition);

    if !search_cpu_cooler_parameter.maker_name.trim().is_empty() {
        searched_cpu_coolers = searched_cpu_coolers.filter(
            cpu_cooler::Column::MakerName.eq(search_cpu_cooler_parameter.maker_name.trim()),
        );
    }
    if let Some(height) = search_cpu_cooler_parameter.height {
        searched_cpu_coolers = searched_cpu_coolers.filter(cpu_cooler::Column::Height.lte(height));
    }
    if let Some(max_tdp) = search_cpu_cooler_parameter.max_tdp {
        searched_cpu_coolers = searched_cpu_coolers.filter(cpu_cooler::Column::MaxTdp.gte(max_tdp));
    }
    if let Some(max_price) = search_cpu_cooler_parameter.max_price {
        searched_cpu_coolers =
            searched_cpu_coolers.filter(cpu_cooler::Column::Price.lte(max_price));
    }
    if let Some(min_price) = search_cpu_cooler_parameter.min_price {
        searched_cpu_coolers =
            searched_cpu_coolers.filter(cpu_cooler::Column::Price.gte(min_price));
    }

    if !search_cpu_cooler_parameter.air_flow_type.trim().is_empty() {
        searched_cpu_coolers = searched_cpu_coolers.filter(
            cpu_cooler::Column::AirFlowType.eq(search_cpu_cooler_parameter.air_flow_type.trim()),
        );
    }

    searched_cpu_coolers = match search_cpu_cooler_parameter.sort_order {
        SortOrder::PriceAsc => searched_cpu_coolers.order_by_asc(cpu_cooler::Column::Price),
        SortOrder::PriceDesc => searched_cpu_coolers.order_by_desc(cpu_cooler::Column::Price),
        SortOrder::RankAsc => searched_cpu_coolers
            .filter(cpu_cooler::Column::PopularRank.is_not_null())
            .order_by_asc(cpu_cooler::Column::PopularRank),
        SortOrder::ReleaseDateDesc => {
            searched_cpu_coolers.order_by_desc(cpu_cooler::Column::ReleaseDate)
        }
    };

    let mut searched_cpu_cooler_with_sockets =
        searched_cpu_coolers.find_with_related(CpuCoolerSocket);

    if !search_cpu_cooler_parameter.socket_name.trim().is_empty() {
        searched_cpu_cooler_with_sockets = searched_cpu_cooler_with_sockets.filter(
            cpu_cooler_socket::Column::SocketName.eq(search_cpu_cooler_parameter.socket_name),
        );
    }

    let db = db::create_db_connection().await?;
    Ok(searched_cpu_cooler_with_sockets.all(&db).await?)
}
