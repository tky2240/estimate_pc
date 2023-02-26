//! SeaORM Entity. Generated by sea-orm-codegen 0.10.0

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "power_supply")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub form_factor: String,
    pub capacity: i32,
    pub eighty_plus_certification: String,
    pub cpu_connector_count: Option<i32>,
    pub six_pin_connector_count: Option<i32>,
    pub eight_pin_connector_count: Option<i32>,
    pub sata_connector_count: Option<i32>,
    pub peripheral_connector_count: Option<i32>,
    pub fdd_connector_count: Option<i32>,
    pub width: Option<f64>,
    pub height: Option<f64>,
    pub depth: Option<f64>,
    pub weight: Option<f64>,
    pub release_date: Option<Date>,
    //#[sea_orm(column_type = "Custom(\"BIT(1)\".to_owned())")]
    pub is_exist: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
