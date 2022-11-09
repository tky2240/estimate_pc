use ssh_jumper::{
    model::{AuthMethod, HostAddress, HostSocketParams, JumpHostAuthParams, SshTunnelParams},
    SshJumper,
};
use std::net::IpAddr;
use std::{borrow::Cow, str::FromStr};

use dotenvy::dotenv;

use kakaku_database::models::prelude::*;
use kakaku_database::models::*;

use sea_orm::ConnectOptions;
use sea_orm::Database;
use sea_orm::EntityTrait;
use sea_orm::{sea_query::Expr, ActiveValue};
use sea_orm::{sea_query::OnConflict, DatabaseConnection};

use kakaku_database::data_json::PcInformation;

use std::env;
use std::fs::File;
use std::io::prelude::*;

use chrono::NaiveDate;
use std::time::Duration;

use pyo3::prelude::*;

use std::fs;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .with_test_writer()
        .init();

    let scraping_result_json_path = execute_python_scraping().expect("execute python code error");
    let mut file = match File::open(scraping_result_json_path) {
        Err(why) => panic!("couldn't open {}", why),
        Ok(file) => file,
    };
    let mut json_string = String::new();
    match file.read_to_string(&mut json_string) {
        Err(why) => panic!("couldn't read {}", why),
        Ok(_) => println!("Successfully read json file"),
    }
    //println!("{}", json_string);
    let pc_information: PcInformation =
        serde_json::from_str(&json_string).expect("failed to deserialize");
    dotenv().ok();
    if env::var("IS_USE_SSH").unwrap().parse().unwrap() {
        let username = env::var("USERNAME").unwrap();
        let password = env::var("PASSWORD").unwrap();
        let database_host_ip_string = env::var("DATABASE_HOST_IP").unwrap();
        let (_local_socket_addr, _ssh_forwarder_end_rx) = {
            let jump_host =
                HostAddress::IpAddr(IpAddr::from_str(&database_host_ip_string).unwrap());
            let jump_host_auth_params = JumpHostAuthParams {
                user_name: Cow::Borrowed(&username),
                auth_method: AuthMethod::Password {
                    password: Cow::Borrowed(&password),
                },
            };
            let target_socket = HostSocketParams {
                address: HostAddress::HostName(Cow::Borrowed("localhost")),
                port: 3306,
            };
            let ssh_params = SshTunnelParams::new(jump_host, jump_host_auth_params, target_socket)
                .with_local_port(3306);
            SshJumper::open_tunnel(&ssh_params)
                .await
                .expect("failed to create tunnel error")
        };
    }
    let db_uri = env::var("DATABASE_URL").unwrap();
    let mut opt = ConnectOptions::new(db_uri.to_owned());
    opt.max_connections(150)
        .min_connections(1)
        .connect_timeout(Duration::from_secs(8))
        .idle_timeout(Duration::from_secs(8))
        .max_lifetime(Duration::from_secs(8))
        .sqlx_logging(true)
        .sqlx_logging_level(log::LevelFilter::Info);
    let db = Database::connect(opt).await.expect("failed to connect db");

    let updated_row_count = update_all_is_exsit(&db).await;
    println!("updated row count : {}", updated_row_count);

    let mut is_success_insert = true;

    is_success_insert &= insert_cpus(&db, pc_information.cpu).await;
    is_success_insert &= insert_cpu_coolers(&db, pc_information.cpu_cooler).await;
    is_success_insert &= insert_motherboards(&db, pc_information.motherboard).await;
    is_success_insert &= insert_memories(&db, pc_information.memory).await;
    is_success_insert &= insert_gpus(&db, pc_information.gpu).await;
    is_success_insert &= insert_ssds(&db, pc_information.ssd).await;
    is_success_insert &= insert_hdds(&db, pc_information.hdd).await;
    is_success_insert &= insert_cases(&db, pc_information.case).await;
    is_success_insert &= insert_power_supplies(&db, pc_information.power_supply).await;
    if is_success_insert {
        println!("successfully inserted");
    } else {
        println!("failed to insert");
    }
}

fn execute_python_scraping() -> PyResult<String> {
    let mut scraping_python_path = env::current_dir().expect("failed to get current directory");
    scraping_python_path.push("scraping_kakaku/main.py");

    let scraping_python_code =
        fs::read_to_string(scraping_python_path).expect("failed to read python code");
    let mut setting_csv_path = env::current_dir().expect("failed to get current directory");
    setting_csv_path.push("scraping_kakaku/genrecode.csv");
    let mut scraping_result_json_path =
        env::current_dir().expect("failed to get current directory");
    scraping_result_json_path.push("data.json");
    let from_python = Python::with_gil(|py| -> PyResult<Py<PyAny>> {
        let scraping: Py<PyAny> = PyModule::from_code(py, &scraping_python_code, "", "")?
            .getattr("run")
            .expect("run python scraping error")
            .into();
        scraping.call1(
            py,
            (
                setting_csv_path
                    .to_owned()
                    .into_os_string()
                    .into_string()
                    .expect("failed to convert path to string"),
                scraping_result_json_path
                    .to_owned()
                    .into_os_string()
                    .into_string()
                    .expect("failed to convert path to string"),
            ),
        )
    });
    println!("py: {}", from_python?);
    Ok(scraping_result_json_path
        .into_os_string()
        .into_string()
        .expect("failed to convert path to string"))
}

async fn update_all_is_exsit(db: &DatabaseConnection) -> u64 {
    let mut updated_row_count: u64 = 0;
    let update_many_cpus_result = Cpu::update_many()
        .col_expr(cpu::Column::IsExist, Expr::value(false))
        .exec(db)
        .await
        .expect("update cpu is exist error");
    updated_row_count += update_many_cpus_result.rows_affected;
    let update_many_cpu_coolers_result = CpuCooler::update_many()
        .col_expr(cpu_cooler::Column::IsExist, Expr::value(false))
        .exec(db)
        .await
        .expect("update cpu cooler is exist error");
    updated_row_count += update_many_cpu_coolers_result.rows_affected;
    let update_many_motherboards_result = Motherboard::update_many()
        .col_expr(motherboard::Column::IsExist, Expr::value(false))
        .exec(db)
        .await
        .expect("update motherboard is exist error");
    updated_row_count += update_many_motherboards_result.rows_affected;
    let update_many_memories_result = Memory::update_many()
        .col_expr(memory::Column::IsExist, Expr::value(false))
        .exec(db)
        .await
        .expect("update memory is exist error");
    updated_row_count += update_many_memories_result.rows_affected;
    let update_many_gpus_result = Gpu::update_many()
        .col_expr(gpu::Column::IsExist, Expr::value(false))
        .exec(db)
        .await
        .expect("update gpu is exist error");
    updated_row_count += update_many_gpus_result.rows_affected;
    let update_many_ssds_result = Ssd::update_many()
        .col_expr(ssd::Column::IsExist, Expr::value(false))
        .exec(db)
        .await
        .expect("update ssd is exist error");
    updated_row_count += update_many_ssds_result.rows_affected;
    let update_many_hdds_result = Hdd::update_many()
        .col_expr(hdd::Column::IsExist, Expr::value(false))
        .exec(db)
        .await
        .expect("update hdd is exist error");
    updated_row_count += update_many_hdds_result.rows_affected;
    let update_many_cases_result = Case::update_many()
        .col_expr(case::Column::IsExist, Expr::value(false))
        .exec(db)
        .await
        .expect("update case is exist error");
    updated_row_count += update_many_cases_result.rows_affected;
    let update_many_power_supplies_result = PowerSupply::update_many()
        .col_expr(power_supply::Column::IsExist, Expr::value(false))
        .exec(db)
        .await
        .expect("update power supply is exist error");
    updated_row_count += update_many_power_supplies_result.rows_affected;

    updated_row_count
}

async fn insert_cpus(
    db: &DatabaseConnection,
    cpu_datas: Vec<kakaku_database::data_json::Cpu>,
) -> bool {
    let mut cpus: Vec<cpu::ActiveModel> = Vec::new();

    for cpu in cpu_datas.iter() {
        let insert_cpu = cpu::ActiveModel {
            item_id: ActiveValue::Set(cpu.item_id.to_owned()),
            name: ActiveValue::Set(cpu.name.to_owned()),
            price: ActiveValue::Set(cpu.price),
            popular_rank: ActiveValue::Set(cpu.popular_rank),
            maker_name: ActiveValue::Set(cpu.maker_name.to_owned()),
            product_name: ActiveValue::Set(cpu.product_name.to_owned()),
            generation: ActiveValue::Set(cpu.generation.to_owned()),
            socket_name: ActiveValue::Set(cpu.socket_name.to_owned()),
            core_count: ActiveValue::Set(cpu.core_count),
            thread_count: ActiveValue::Set(cpu.thread_count),
            tdp: ActiveValue::Set(cpu.tdp),
            base_clock: ActiveValue::Set(cpu.base_clock),
            boost_clock: ActiveValue::Set(cpu.boost_clock),
            graphics: ActiveValue::Set(cpu.graphics.to_owned()),
            release_date: ActiveValue::Set(match &cpu.release_date {
                None => None,
                Some(release_date_string) => {
                    NaiveDate::parse_from_str(&release_date_string, "%Y-%m-%d").ok()
                }
            }),
            is_exist: ActiveValue::Set(cpu.is_exist),
        };
        cpus.push(insert_cpu);
    }
    let last_cpu = cpus[cpus.len() - 1].clone();
    let result = Cpu::insert_many(cpus)
        .on_conflict(
            OnConflict::column(cpu::Column::ItemId)
                .update_columns([
                    cpu::Column::PopularRank,
                    cpu::Column::Price,
                    cpu::Column::IsExist,
                ])
                .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    assert_eq!(result.last_insert_id, last_cpu.item_id.to_owned().unwrap());

    result.last_insert_id == last_cpu.item_id.unwrap()
}

async fn insert_cpu_coolers(
    db: &DatabaseConnection,
    cpu_cooler_datas: Vec<kakaku_database::data_json::CpuCooler>,
) -> bool {
    let mut cpu_coolers: Vec<cpu_cooler::ActiveModel> = Vec::new();
    let mut cpu_cooler_sockets: Vec<cpu_cooler_socket::ActiveModel> = Vec::new();
    for cpu_cooler in cpu_cooler_datas.iter() {
        let insert_cpu_cooler = cpu_cooler::ActiveModel {
            item_id: ActiveValue::Set(cpu_cooler.item_id.to_owned()),
            name: ActiveValue::Set(cpu_cooler.name.to_owned()),
            price: ActiveValue::Set(cpu_cooler.price),
            popular_rank: ActiveValue::Set(cpu_cooler.popular_rank),
            maker_name: ActiveValue::Set(cpu_cooler.maker_name.to_owned()),
            product_name: ActiveValue::Set(cpu_cooler.product_name.to_owned()),
            air_flow_type: ActiveValue::Set(cpu_cooler.air_flow_type.to_owned()),
            noise_level: ActiveValue::Set(cpu_cooler.noise_level.to_owned()),
            max_tdp: ActiveValue::Set(cpu_cooler.max_tdp),
            width: ActiveValue::Set(cpu_cooler.width),
            height: ActiveValue::Set(cpu_cooler.height),
            depth: ActiveValue::Set(cpu_cooler.depth),
            release_date: ActiveValue::Set(match &cpu_cooler.release_date {
                None => None,
                Some(release_date_string) => {
                    NaiveDate::parse_from_str(&release_date_string, "%Y-%m-%d").ok()
                }
            }),
            is_exist: ActiveValue::Set(cpu_cooler.is_exist),
        };
        cpu_coolers.push(insert_cpu_cooler);
        for cpu_cooler_socket_name in cpu_cooler.cpu_cooler_sockets.iter() {
            let insert_cpu_socket = cpu_cooler_socket::ActiveModel {
                cpu_cooler_item_id: ActiveValue::Set(cpu_cooler.item_id.to_owned()),
                socket_name: ActiveValue::Set(cpu_cooler_socket_name.to_owned()),
            };
            cpu_cooler_sockets.push(insert_cpu_socket);
        }
    }
    let last_cpu_cooler = cpu_coolers[cpu_coolers.len() - 1].clone();
    let last_cpu_cooler_socket = cpu_cooler_sockets[cpu_cooler_sockets.len() - 1].clone();
    let cpu_coolers_result = CpuCooler::insert_many(cpu_coolers)
        .on_conflict(
            OnConflict::column(cpu_cooler::Column::ItemId)
                .update_columns([
                    cpu::Column::PopularRank,
                    cpu::Column::Price,
                    cpu::Column::IsExist,
                ])
                .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    let cpu_cooler_sockets_result = CpuCoolerSocket::insert_many(cpu_cooler_sockets)
        .on_conflict(
            OnConflict::columns([
                cpu_cooler_socket::Column::CpuCoolerItemId,
                cpu_cooler_socket::Column::SocketName,
            ])
            .update_column(cpu_cooler_socket::Column::CpuCoolerItemId)
            .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    assert_eq!(
        cpu_coolers_result.last_insert_id,
        last_cpu_cooler.item_id.to_owned().unwrap()
    );
    assert_eq!(
        cpu_cooler_sockets_result.last_insert_id.0,
        last_cpu_cooler_socket
            .cpu_cooler_item_id
            .to_owned()
            .unwrap()
    );
    cpu_coolers_result.last_insert_id == last_cpu_cooler.item_id.unwrap()
        && cpu_cooler_sockets_result.last_insert_id.0
            == last_cpu_cooler_socket.cpu_cooler_item_id.unwrap()
}

async fn insert_motherboards(
    db: &DatabaseConnection,
    motherboard_datas: Vec<kakaku_database::data_json::Motherboard>,
) -> bool {
    let mut motherboards: Vec<motherboard::ActiveModel> = Vec::new();

    for motherboard in motherboard_datas.iter() {
        let insert_motherboard = motherboard::ActiveModel {
            item_id: ActiveValue::Set(motherboard.item_id.to_owned()),
            name: ActiveValue::Set(motherboard.name.to_owned()),
            price: ActiveValue::Set(motherboard.price),
            popular_rank: ActiveValue::Set(motherboard.popular_rank),
            maker_name: ActiveValue::Set(motherboard.maker_name.to_owned()),
            product_name: ActiveValue::Set(motherboard.product_name.to_owned()),
            chipset: ActiveValue::Set(motherboard.chipset.to_owned()),
            socket_name: ActiveValue::Set(motherboard.socket_name.to_owned()),
            form_factor: ActiveValue::Set(motherboard.form_factor.to_owned()),
            memory_type: ActiveValue::Set(motherboard.memory_type.to_owned()),
            memory_slot_count: ActiveValue::Set(motherboard.memory_slot_count),
            max_memory_capacity: ActiveValue::Set(motherboard.max_memory_capacity),
            pci_slot_count: ActiveValue::Set(motherboard.pci_slot_count),
            pcie_x1_slot_count: ActiveValue::Set(motherboard.pcie_x1_slot_count),
            pcie_x4_slot_count: ActiveValue::Set(motherboard.pcie_x4_slot_count),
            pcie_x8_slot_count: ActiveValue::Set(motherboard.pcie_x8_slot_count),
            pcie_x16_slot_count: ActiveValue::Set(motherboard.pcie_x16_slot_count),
            sata_connector_count: ActiveValue::Set(motherboard.sata_connector_count),
            release_date: ActiveValue::Set(match &motherboard.release_date {
                None => None,
                Some(release_date_string) => {
                    NaiveDate::parse_from_str(&release_date_string, "%Y-%m-%d").ok()
                }
            }),
            is_exist: ActiveValue::Set(motherboard.is_exist),
        };
        motherboards.push(insert_motherboard);
    }
    let last_motherboard = motherboards[motherboards.len() - 1].clone();
    let result = Motherboard::insert_many(motherboards)
        .on_conflict(
            OnConflict::column(motherboard::Column::ItemId)
                .update_columns([
                    cpu::Column::PopularRank,
                    cpu::Column::Price,
                    cpu::Column::IsExist,
                ])
                .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    assert_eq!(
        result.last_insert_id,
        last_motherboard.item_id.to_owned().unwrap()
    );

    result.last_insert_id == last_motherboard.item_id.unwrap()
}

async fn insert_memories(
    db: &DatabaseConnection,
    memory_datas: Vec<kakaku_database::data_json::Memory>,
) -> bool {
    let mut memories: Vec<memory::ActiveModel> = Vec::new();

    for memory in memory_datas.iter() {
        let insert_memory = memory::ActiveModel {
            item_id: ActiveValue::Set(memory.item_id.to_owned()),
            name: ActiveValue::Set(memory.name.to_owned()),
            price: ActiveValue::Set(memory.price),
            popular_rank: ActiveValue::Set(memory.popular_rank),
            maker_name: ActiveValue::Set(memory.maker_name.to_owned()),
            product_name: ActiveValue::Set(memory.product_name.to_owned()),
            capacity_per_module: ActiveValue::Set(memory.capacity_per_module),
            module_count: ActiveValue::Set(memory.module_count),
            interface: ActiveValue::Set(memory.interface.to_owned()),
            memory_type: ActiveValue::Set(memory.memory_type.to_owned()),
            module_type: ActiveValue::Set(memory.module_type.to_owned()),
            release_date: ActiveValue::Set(match &memory.release_date {
                None => None,
                Some(release_date_string) => {
                    NaiveDate::parse_from_str(&release_date_string, "%Y-%m-%d").ok()
                }
            }),
            is_exist: ActiveValue::Set(memory.is_exist),
        };
        memories.push(insert_memory);
    }
    let last_memory = memories[memories.len() - 1].clone();
    let result = Memory::insert_many(memories)
        .on_conflict(
            OnConflict::column(memory::Column::ItemId)
                .update_columns([
                    cpu::Column::PopularRank,
                    cpu::Column::Price,
                    cpu::Column::IsExist,
                ])
                .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    assert_eq!(
        result.last_insert_id,
        last_memory.item_id.to_owned().unwrap()
    );

    result.last_insert_id == last_memory.item_id.unwrap()
}

async fn insert_gpus(
    db: &DatabaseConnection,
    gpu_datas: Vec<kakaku_database::data_json::Gpu>,
) -> bool {
    let mut gpus: Vec<gpu::ActiveModel> = Vec::new();

    for gpu in gpu_datas.iter() {
        let insert_gpu = gpu::ActiveModel {
            item_id: ActiveValue::Set(gpu.item_id.to_owned()),
            name: ActiveValue::Set(gpu.name.to_owned()),
            price: ActiveValue::Set(gpu.price),
            popular_rank: ActiveValue::Set(gpu.popular_rank),
            maker_name: ActiveValue::Set(gpu.maker_name.to_owned()),
            product_name: ActiveValue::Set(gpu.product_name.to_owned()),
            chip_name: ActiveValue::Set(gpu.chip_name.to_owned()),
            gpu_memory_type: ActiveValue::Set(gpu.gpu_memory_type.to_owned()),
            gpu_memory_capacity: ActiveValue::Set(gpu.gpu_memory_capacity),
            gpu_memory_bus_width: ActiveValue::Set(gpu.gpu_memory_bus_width),
            gpu_memory_clock: ActiveValue::Set(gpu.gpu_memory_clock),
            pcie_interface: ActiveValue::Set(gpu.pcie_interface.to_owned()),
            is_low_profile: ActiveValue::Set(gpu.is_low_profile),
            cooling_solution: ActiveValue::Set(gpu.cooling_solution.to_owned()),
            tdp: ActiveValue::Set(gpu.tdp),
            hdmi_count: ActiveValue::Set(gpu.hdmi_count),
            displayport_count: ActiveValue::Set(gpu.displayport_count),
            width: ActiveValue::Set(gpu.width),
            height: ActiveValue::Set(gpu.height),
            depth: ActiveValue::Set(gpu.depth),
            radiator_width: ActiveValue::Set(gpu.radiator_width),
            radiator_height: ActiveValue::Set(gpu.radiator_height),
            radiator_depth: ActiveValue::Set(gpu.radiator_depth),
            release_date: ActiveValue::Set(match &gpu.release_date {
                None => None,
                Some(release_date_string) => {
                    NaiveDate::parse_from_str(&release_date_string, "%Y-%m-%d").ok()
                }
            }),
            is_exist: ActiveValue::Set(gpu.is_exist),
        };
        gpus.push(insert_gpu);
    }
    let last_gpu = gpus[gpus.len() - 1].clone();
    let result = Gpu::insert_many(gpus)
        .on_conflict(
            OnConflict::column(gpu::Column::ItemId)
                .update_columns([
                    cpu::Column::PopularRank,
                    cpu::Column::Price,
                    cpu::Column::IsExist,
                ])
                .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    assert_eq!(result.last_insert_id, last_gpu.item_id.to_owned().unwrap());

    result.last_insert_id == last_gpu.item_id.unwrap()
}

async fn insert_ssds(
    db: &DatabaseConnection,
    ssd_datas: Vec<kakaku_database::data_json::Ssd>,
) -> bool {
    let mut ssds: Vec<ssd::ActiveModel> = Vec::new();

    for ssd in ssd_datas.iter() {
        let insert_ssd = ssd::ActiveModel {
            item_id: ActiveValue::Set(ssd.item_id.to_owned()),
            name: ActiveValue::Set(ssd.name.to_owned()),
            price: ActiveValue::Set(ssd.price),
            popular_rank: ActiveValue::Set(ssd.popular_rank),
            maker_name: ActiveValue::Set(ssd.maker_name.to_owned()),
            product_name: ActiveValue::Set(ssd.product_name.to_owned()),
            capacity: ActiveValue::Set(ssd.capacity),
            size: ActiveValue::Set(ssd.size.to_owned()),
            interface: ActiveValue::Set(ssd.interface.to_owned()),
            tbw: ActiveValue::Set(ssd.tbw),
            release_date: ActiveValue::Set(match &ssd.release_date {
                None => None,
                Some(release_date_string) => {
                    NaiveDate::parse_from_str(&release_date_string, "%Y-%m-%d").ok()
                }
            }),
            is_exist: ActiveValue::Set(ssd.is_exist),
        };
        ssds.push(insert_ssd);
    }
    let last_ssd = ssds[ssds.len() - 1].clone();
    let result = Ssd::insert_many(ssds)
        .on_conflict(
            OnConflict::column(ssd::Column::ItemId)
                .update_columns([
                    cpu::Column::PopularRank,
                    cpu::Column::Price,
                    cpu::Column::IsExist,
                ])
                .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    assert_eq!(result.last_insert_id, last_ssd.item_id.to_owned().unwrap());

    result.last_insert_id == last_ssd.item_id.unwrap()
}

async fn insert_hdds(
    db: &DatabaseConnection,
    hdd_datas: Vec<kakaku_database::data_json::Hdd>,
) -> bool {
    let mut hdds: Vec<hdd::ActiveModel> = Vec::new();

    for hdd in hdd_datas.iter() {
        let insert_hdd = hdd::ActiveModel {
            item_id: ActiveValue::Set(hdd.item_id.to_owned()),
            name: ActiveValue::Set(hdd.name.to_owned()),
            price: ActiveValue::Set(hdd.price),
            popular_rank: ActiveValue::Set(hdd.popular_rank),
            maker_name: ActiveValue::Set(hdd.maker_name.to_owned()),
            product_name: ActiveValue::Set(hdd.product_name.to_owned()),
            capacity: ActiveValue::Set(hdd.capacity),
            rpm: ActiveValue::Set(hdd.rpm),
            write_style: ActiveValue::Set(hdd.write_style.to_owned()),
            release_date: ActiveValue::Set(match &hdd.release_date {
                None => None,
                Some(release_date_string) => {
                    NaiveDate::parse_from_str(&release_date_string, "%Y-%m-%d").ok()
                }
            }),
            is_exist: ActiveValue::Set(hdd.is_exist),
        };
        hdds.push(insert_hdd);
    }
    let last_hdd = hdds[hdds.len() - 1].clone();
    let result = Hdd::insert_many(hdds)
        .on_conflict(
            OnConflict::column(hdd::Column::ItemId)
                .update_columns([
                    cpu::Column::PopularRank,
                    cpu::Column::Price,
                    cpu::Column::IsExist,
                ])
                .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    assert_eq!(result.last_insert_id, last_hdd.item_id.to_owned().unwrap());

    result.last_insert_id == last_hdd.item_id.unwrap()
}

async fn insert_cases(
    db: &DatabaseConnection,
    case_datas: Vec<kakaku_database::data_json::Case>,
) -> bool {
    let mut cases: Vec<case::ActiveModel> = Vec::new();
    let mut case_support_form_factors: Vec<case_support_form_factor::ActiveModel> = Vec::new();
    for case in case_datas.iter() {
        let insert_case = case::ActiveModel {
            item_id: ActiveValue::Set(case.item_id.to_owned()),
            name: ActiveValue::Set(case.name.to_owned()),
            price: ActiveValue::Set(case.price),
            popular_rank: ActiveValue::Set(case.popular_rank),
            maker_name: ActiveValue::Set(case.maker_name.to_owned()),
            product_name: ActiveValue::Set(case.product_name.to_owned()),
            max_gpu_length: ActiveValue::Set(case.max_gpu_length),
            max_cpu_cooler_height: ActiveValue::Set(case.max_cpu_cooler_height),
            max_power_supply_size: ActiveValue::Set(case.max_power_supply_size),
            slot_count: ActiveValue::Set(case.slot_count),
            drive_bay_information: ActiveValue::Set(case.drive_bay_information.to_owned()),
            is_low_profile: ActiveValue::Set(case.is_low_profile),
            weight: ActiveValue::Set(case.weight),
            width: ActiveValue::Set(case.width),
            height: ActiveValue::Set(case.height),
            depth: ActiveValue::Set(case.depth),
            release_date: ActiveValue::Set(match &case.release_date {
                None => None,
                Some(release_date_string) => {
                    NaiveDate::parse_from_str(&release_date_string, "%Y-%m-%d").ok()
                }
            }),
            is_exist: ActiveValue::Set(case.is_exist),
        };
        cases.push(insert_case);
        for case_support_form_factor in case.case_support_form_factors.iter() {
            let insert_case_support_form_factor = case_support_form_factor::ActiveModel {
                case_item_id: ActiveValue::Set(case.item_id.to_owned()),
                form_factor: ActiveValue::Set(case_support_form_factor.to_owned()),
            };
            case_support_form_factors.push(insert_case_support_form_factor);
        }
    }
    let last_case = cases[cases.len() - 1].clone();
    let last_case_support_form_factor =
        case_support_form_factors[case_support_form_factors.len() - 1].clone();
    let cases_result = Case::insert_many(cases)
        .on_conflict(
            OnConflict::column(case::Column::ItemId)
                .update_columns([
                    cpu::Column::PopularRank,
                    cpu::Column::Price,
                    cpu::Column::IsExist,
                ])
                .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    let case_support_form_factors_result =
        CaseSupportFormFactor::insert_many(case_support_form_factors)
            .on_conflict(
                OnConflict::columns([
                    case_support_form_factor::Column::CaseItemId,
                    case_support_form_factor::Column::FormFactor,
                ])
                .update_column(case_support_form_factor::Column::CaseItemId)
                .to_owned(),
            )
            .exec(db)
            .await
            .expect("insert error");
    assert_eq!(
        cases_result.last_insert_id,
        last_case.item_id.to_owned().unwrap()
    );
    assert_eq!(
        case_support_form_factors_result.last_insert_id.0,
        last_case_support_form_factor
            .case_item_id
            .to_owned()
            .unwrap()
    );
    cases_result.last_insert_id == last_case.item_id.unwrap()
        && case_support_form_factors_result.last_insert_id.0
            == last_case_support_form_factor.case_item_id.unwrap()
}

async fn insert_power_supplies(
    db: &DatabaseConnection,
    power_supply_datas: Vec<kakaku_database::data_json::PowerSupply>,
) -> bool {
    let mut power_supplies: Vec<power_supply::ActiveModel> = Vec::new();

    for power_supply in power_supply_datas.iter() {
        let insert_power_supply = power_supply::ActiveModel {
            item_id: ActiveValue::Set(power_supply.item_id.to_owned()),
            name: ActiveValue::Set(power_supply.name.to_owned()),
            price: ActiveValue::Set(power_supply.price),
            popular_rank: ActiveValue::Set(power_supply.popular_rank),
            maker_name: ActiveValue::Set(power_supply.maker_name.to_owned()),
            product_name: ActiveValue::Set(power_supply.product_name.to_owned()),
            form_factor: ActiveValue::Set(power_supply.form_factor.to_owned()),
            capacity: ActiveValue::Set(power_supply.capacity),
            eighty_plus_certification: ActiveValue::Set(
                power_supply.eighty_plus_certification.to_owned(),
            ),
            cpu_connector_count: ActiveValue::Set(power_supply.cpu_connector_count),
            six_pin_connector_count: ActiveValue::Set(power_supply.six_pin_connector_count),
            eight_pin_connector_count: ActiveValue::Set(power_supply.eight_pin_connector_count),
            sata_connector_count: ActiveValue::Set(power_supply.sata_connector_count),
            peripheral_connector_count: ActiveValue::Set(power_supply.peripheral_connector_count),
            fdd_connector_count: ActiveValue::Set(power_supply.fdd_connector_count),
            width: ActiveValue::Set(power_supply.width),
            height: ActiveValue::Set(power_supply.height),
            depth: ActiveValue::Set(power_supply.depth),
            weight: ActiveValue::Set(power_supply.weight),
            release_date: ActiveValue::Set(match &power_supply.release_date {
                None => None,
                Some(release_date_string) => {
                    NaiveDate::parse_from_str(&release_date_string, "%Y-%m-%d").ok()
                }
            }),
            is_exist: ActiveValue::Set(power_supply.is_exist),
        };
        power_supplies.push(insert_power_supply);
    }
    let last_power_supply = power_supplies[power_supplies.len() - 1].clone();
    let result = PowerSupply::insert_many(power_supplies)
        .on_conflict(
            OnConflict::column(power_supply::Column::ItemId)
                .update_columns([
                    cpu::Column::PopularRank,
                    cpu::Column::Price,
                    cpu::Column::IsExist,
                ])
                .to_owned(),
        )
        .exec(db)
        .await
        .expect("insert error");
    assert_eq!(
        result.last_insert_id,
        last_power_supply.item_id.to_owned().unwrap()
    );

    result.last_insert_id == last_power_supply.item_id.unwrap()
}
