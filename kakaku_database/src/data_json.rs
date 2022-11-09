use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct PcInformation {
    pub cpu: Vec<Cpu>,
    pub cpu_cooler: Vec<CpuCooler>,
    pub motherboard: Vec<Motherboard>,
    pub memory: Vec<Memory>,
    pub gpu: Vec<Gpu>,
    pub ssd: Vec<Ssd>,
    pub hdd: Vec<Hdd>,
    pub case: Vec<Case>,
    pub power_supply: Vec<PowerSupply>,
}

#[derive(Serialize, Deserialize)]
pub struct Cpu {
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub generation: String,
    pub socket_name: String,
    pub core_count: i32,
    pub thread_count: i32,
    pub tdp: Option<i32>,
    pub base_clock: f64,
    pub boost_clock: Option<f64>,
    pub graphics: String,
    pub release_date: Option<String>,
    pub is_exist: bool,
}

#[derive(Serialize, Deserialize)]
pub struct CpuCooler {
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub air_flow_type: String,
    pub noise_level: String,
    pub max_tdp: Option<i32>,
    pub width: Option<f64>,
    pub height: Option<f64>,
    pub depth: Option<f64>,
    pub release_date: Option<String>,
    pub is_exist: bool,
    pub cpu_cooler_sockets: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct Motherboard {
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub chipset: String,
    pub socket_name: String,
    pub form_factor: String,
    pub memory_type: String,
    pub memory_slot_count: i32,
    pub max_memory_capacity: i32,
    pub pci_slot_count: i32,
    pub pcie_x16_slot_count: i32,
    pub pcie_x8_slot_count: i32,
    pub pcie_x4_slot_count: i32,
    pub pcie_x1_slot_count: i32,
    pub sata_connector_count: i32,
    pub release_date: Option<String>,
    pub is_exist: bool,
}

#[derive(Serialize, Deserialize)]
pub struct Memory {
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub capacity_per_module: i32,
    pub module_count: i32,
    pub interface: String,
    pub memory_type: String,
    pub module_type: String,
    pub release_date: Option<String>,
    pub is_exist: bool,
}

#[derive(Serialize, Deserialize)]
pub struct Gpu {
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub chip_name: String,
    pub gpu_memory_type: String,
    pub gpu_memory_capacity: i32,
    pub gpu_memory_bus_width: Option<i32>,
    pub gpu_memory_clock: Option<f64>,
    pub pcie_interface: String,
    pub is_low_profile: bool,
    pub cooling_solution: String,
    pub tdp: Option<i32>,
    pub hdmi_count: i32,
    pub displayport_count: i32,
    pub width: Option<f64>,
    pub height: Option<f64>,
    pub depth: Option<f64>,
    pub radiator_width: Option<f64>,
    pub radiator_height: Option<f64>,
    pub radiator_depth: Option<f64>,
    pub release_date: Option<String>,
    pub is_exist: bool,
}

#[derive(Serialize, Deserialize)]
pub struct Ssd {
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub capacity: i32,
    pub size: String,
    pub interface: String,
    pub tbw: Option<i32>,
    pub release_date: Option<String>,
    pub is_exist: bool,
}

#[derive(Serialize, Deserialize)]
pub struct Hdd {
    pub item_id: String,
    pub name: String,
    pub price: i32,
    pub popular_rank: Option<i32>,
    pub maker_name: String,
    pub product_name: String,
    pub capacity: i32,
    pub rpm: Option<i32>,
    pub write_style: String,
    pub release_date: Option<String>,
    pub is_exist: bool,
}

#[derive(Serialize, Deserialize)]
pub struct Case {
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
    pub is_low_profile: bool,
    pub weight: Option<f64>,
    pub width: Option<f64>,
    pub height: Option<f64>,
    pub depth: Option<f64>,
    pub release_date: Option<String>,
    pub is_exist: bool,
    pub case_support_form_factors: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct PowerSupply {
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
    pub release_date: Option<String>,
    pub is_exist: bool,
}
