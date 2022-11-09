//! SeaORM Entity. Generated by sea-orm-codegen 0.10.0

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "case")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub max_gpu_length: Option<f64>,
    pub max_cpu_cooler_height: Option<f64>,
    pub max_power_supply_size: Option<f64>,
    pub slot_count: Option<f64>,
    pub drive_bay_information: String,
    //#[sea_orm(column_type = "Custom(\"BIT(1)\".to_owned())")]
    pub is_low_profile: bool,
    pub weight: Option<f64>,
    pub width: Option<f64>,
    pub height: Option<f64>,
    pub depth: Option<f64>,
    pub release_date: Option<Date>,
    //#[sea_orm(column_type = "Custom(\"BIT(1)\".to_owned())")]
    pub is_exist: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::case_support_form_factor::Entity")]
    CaseSupportFormFactor,
}

impl Related<super::case_support_form_factor::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::CaseSupportFormFactor.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
