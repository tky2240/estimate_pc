use crate::models::case;
use crate::models::cpu;
use crate::models::cpu_cooler;
use crate::models::gpu;
use crate::models::hdd;
use crate::models::memory;
use crate::models::motherboard;
use crate::models::power_supply;
use crate::models::ssd;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub enum SortOrder {
    PriceAsc,
    PriceDesc,
    RankAsc,
    ReleaseDateDesc,
}

#[derive(Serialize, Deserialize)]
pub struct SearchFromItemIdParameter {
    pub case_ids: Vec<String>,
    pub cpu_cooler_ids: Vec<String>,
    pub cpu_ids: Vec<String>,
    pub gpu_ids: Vec<String>,
    pub hdd_ids: Vec<String>,
    pub memory_ids: Vec<String>,
    pub motherboard_ids: Vec<String>,
    pub power_supply_ids: Vec<String>,
    pub ssd_ids: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct SearchedParts {
    pub cases: Vec<case::Model>,
    pub cpu_coolers: Vec<cpu_cooler::Model>,
    pub cpus: Vec<cpu::Model>,
    pub gpus: Vec<gpu::Model>,
    pub hdds: Vec<hdd::Model>,
    pub memories: Vec<memory::Model>,
    pub motherboards: Vec<motherboard::Model>,
    pub power_supplies: Vec<power_supply::Model>,
    pub ssds: Vec<ssd::Model>,
}
