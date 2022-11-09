use crate::models::case;
use crate::models::case_support_form_factor;
use crate::models::prelude::Case;
use crate::models::prelude::CaseSupportFormFactor;
use crate::search_error::SearchError;

use sea_orm::{EntityTrait, QueryFilter};

use sea_orm::{entity::*, query::*};

use super::search::SortOrder;
use crate::db;
use std::result::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchCaseParameter {
    pub search_text: String,
    pub sort_order: SortOrder,
    pub maker_name: String,
    pub form_factor: String,
    pub is_low_profile: bool,
    pub min_price: Option<i32>,
    pub max_price: Option<i32>,
}

pub async fn search_case(
    search_case_parameter: SearchCaseParameter,
) -> Result<Vec<(case::Model, Vec<case_support_form_factor::Model>)>, SearchError> {
    let search_words: Vec<&str> = search_case_parameter
        .search_text
        .trim()
        .split_whitespace()
        .collect();
    let mut searched_cases = Case::find().filter(case::Column::IsExist.eq(true));
    let mut name_condition = Condition::any();
    for word in search_words {
        name_condition = name_condition.add(case::Column::Name.contains(word));
    }
    searched_cases = searched_cases.filter(name_condition);

    if !search_case_parameter.maker_name.trim().is_empty() {
        searched_cases = searched_cases
            .filter(case::Column::MakerName.eq(search_case_parameter.maker_name.trim()));
    }

    searched_cases =
        searched_cases.filter(case::Column::IsLowProfile.eq(search_case_parameter.is_low_profile));

    if let Some(max_price) = search_case_parameter.max_price {
        searched_cases = searched_cases.filter(case::Column::Price.lte(max_price));
    }
    if let Some(min_price) = search_case_parameter.min_price {
        searched_cases = searched_cases.filter(case::Column::Price.gte(min_price));
    }

    searched_cases = match search_case_parameter.sort_order {
        SortOrder::PriceAsc => searched_cases.order_by_asc(case::Column::Price),
        SortOrder::PriceDesc => searched_cases.order_by_desc(case::Column::Price),
        SortOrder::RankAsc => searched_cases.order_by_asc(case::Column::PopularRank),
        SortOrder::ReleaseDateDesc => searched_cases.order_by_desc(case::Column::ReleaseDate),
    };

    let mut searched_case_with_form_factors =
        searched_cases.find_with_related(CaseSupportFormFactor);

    if !search_case_parameter.form_factor.trim().is_empty() {
        if search_case_parameter.form_factor.trim() == "ATX" {
            searched_case_with_form_factors = searched_case_with_form_factors.filter(
                Condition::any()
                    .add(case_support_form_factor::Column::FormFactor.eq("ATX"))
                    .add(
                        case_support_form_factor::Column::FormFactor.eq("ATX(width：under 280mm)"),
                    ),
            );
        } else {
            searched_case_with_form_factors = searched_case_with_form_factors.filter(
                case_support_form_factor::Column::FormFactor
                    .contains(search_case_parameter.form_factor.trim()),
            );
        }
    }

    let db = db::create_db_connection().await?;
    Ok(searched_case_with_form_factors.all(&db).await?)
}
