//! SeaORM Entity. Generated by sea-orm-codegen 0.10.0

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, DeriveEntityModel, Eq)]
#[sea_orm(table_name = "hdd")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub capacity: i32,
    pub rpm: Option<i32>,
    pub write_style: String,
    pub release_date: Option<Date>,
    //#[sea_orm(column_type = "Custom(\"BIT(1)\".to_owned())")]
    pub is_exist: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
