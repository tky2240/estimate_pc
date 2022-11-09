use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub enum SortOrder {
    PriceAsc,
    PriceDesc,
    RankAsc,
    ReleaseDateDesc,
}
