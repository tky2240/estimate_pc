use axum::extract::rejection::*;
use axum::extract::Json;
use axum::extract::State;
use axum::http::Method;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing;
use axum::Router;
use axum::{error_handling::HandleErrorLayer, BoxError};
use axum_macros::debug_handler;
use dotenvy;
use http::header::CONTENT_TYPE;
use kakaku_api::db;
use kakaku_api::search::search::SearchFromItemIdParameter;
use kakaku_api::search_error::SearchError;
use kakaku_api::short_url::CreateShortUrlError;
use kakaku_api::*;
use sea_orm::prelude::Date;
use sea_orm::DatabaseConnection;
use serde::{Deserialize, Serialize};
use std::env;
use std::net::SocketAddr;
use std::time::Duration;
use tower::buffer::BufferLayer;
use tower::limit::RateLimitLayer;
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    tracing_subscriber::fmt::init();
    let db = db::create_db_connection()
        .await
        .expect("failed to connect database");
    let state = AppState { db };
    let router = Router::new()
        .route("/v1/search/cpu", routing::post(search_cpu_handler))
        .route(
            "/v1/search/cpu_cooler",
            routing::post(search_cpu_cooler_handler),
        )
        .route(
            "/v1/search/motherboard",
            routing::post(search_motherboard_handler),
        )
        .route("/v1/search/memory", routing::post(search_memory_handler))
        .route("/v1/search/gpu", routing::post(search_gpu_handler))
        .route("/v1/search/ssd", routing::post(search_ssd_handler))
        .route("/v1/search/hdd", routing::post(search_hdd_handler))
        .route("/v1/search/case", routing::post(search_case_handler))
        .route(
            "/v1/search/power_supply",
            routing::post(search_power_supply_handler),
        )
        .route("/v1/search/all", routing::post(search_all_handler))
        .route(
            "/v1/create/short_url",
            routing::post(create_short_url_handler),
        )
        .layer(
            ServiceBuilder::new()
                .layer(HandleErrorLayer::new(|err: BoxError| async move {
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        format!("Unhandled error: {}", err),
                    )
                }))
                .layer(
                    CorsLayer::new()
                        .allow_origin(Any)
                        .allow_methods([Method::POST])
                        .allow_headers([CONTENT_TYPE]),
                )
                .layer(BufferLayer::new(1024))
                .layer(RateLimitLayer::new(20, Duration::from_secs(1))),
        )
        .with_state(state);
    let addr = SocketAddr::from((
        [0, 0, 0, 0],
        env::var("API_LISTEN_PORT").unwrap().parse().unwrap(),
    ));
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(router.into_make_service())
        .await
        .unwrap();
}

#[derive(Clone)]
struct AppState {
    pub db: DatabaseConnection,
}

#[debug_handler]
async fn create_short_url_handler(body: String) -> Result<impl IntoResponse, CreateShortUrlError> {
    let short_url = short_url::create_short_url(body).await?;
    Ok((StatusCode::OK, short_url).into_response())
}

#[debug_handler]
async fn search_all_handler(
    state: State<AppState>,
    payload: Result<Json<SearchFromItemIdParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_all(state, payload).await
}

async fn search_all(
    state: State<AppState>,
    payload: Result<Json<SearchFromItemIdParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_from_item_id_parameter_json = payload?;
    let searched_cases = search::case::search_case_from_ids(
        &state.db,
        search_from_item_id_parameter_json.0.case_ids,
    )
    .await?;
    let searched_cpus =
        search::cpu::search_cpu_from_ids(&state.db, search_from_item_id_parameter_json.0.cpu_ids)
            .await?;
    let searched_cpu_coolers = search::cpu_cooler::search_cpu_cooler_from_ids(
        &state.db,
        search_from_item_id_parameter_json.0.cpu_cooler_ids,
    )
    .await?;
    let searched_gpus =
        search::gpu::search_gpu_from_ids(&state.db, search_from_item_id_parameter_json.0.gpu_ids)
            .await?;
    let searched_hdds =
        search::hdd::search_hdd_from_ids(&state.db, search_from_item_id_parameter_json.0.hdd_ids)
            .await?;
    let searched_memories = search::memory::search_memory_from_ids(
        &state.db,
        search_from_item_id_parameter_json.0.memory_ids,
    )
    .await?;
    let searched_motherboards = search::motherboard::search_motherboard_from_ids(
        &state.db,
        search_from_item_id_parameter_json.0.motherboard_ids,
    )
    .await?;
    let searched_power_supplies = search::power_supply::search_power_supply_from_ids(
        &state.db,
        search_from_item_id_parameter_json.0.power_supply_ids,
    )
    .await?;
    let searched_ssds =
        search::ssd::search_ssd_from_ids(&state.db, search_from_item_id_parameter_json.0.ssd_ids)
            .await?;
    let searched_parts = search::search::SearchedParts {
        cases: searched_cases,
        cpu_coolers: searched_cpu_coolers,
        cpus: searched_cpus,
        gpus: searched_gpus,
        hdds: searched_hdds,
        memories: searched_memories,
        motherboards: searched_motherboards,
        power_supplies: searched_power_supplies,
        ssds: searched_ssds,
    };
    Ok((StatusCode::OK, Json(searched_parts).into_response()))
}

#[debug_handler]
async fn search_cpu_handler(
    state: State<AppState>,
    payload: Result<Json<search::cpu::SearchCpuParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_cpu(state, payload).await
}

async fn search_cpu(
    state: State<AppState>,
    payload: Result<Json<search::cpu::SearchCpuParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_cpu_parameter_json = payload?;

    let searched_cpus = search::cpu::search_cpu(&state.db, search_cpu_parameter_json.0).await?;
    Ok((StatusCode::OK, Json(searched_cpus)).into_response())
}

#[debug_handler]
async fn search_cpu_cooler_handler(
    state: State<AppState>,
    payload: Result<Json<search::cpu_cooler::SearchCpuCoolerParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_cpu_cooler(state, payload).await
}

async fn search_cpu_cooler(
    state: State<AppState>,
    payload: Result<Json<search::cpu_cooler::SearchCpuCoolerParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_cpu_cooler_parameter_json = payload?;

    let searched_cpu_coolers =
        search::cpu_cooler::search_cpu_cooler(&state.db, search_cpu_cooler_parameter_json.0)
            .await?;

    let searched_cpu_cooler_with_sockets: Vec<CpuCoolerWithSocket> = searched_cpu_coolers
        .iter()
        .map(|x| CpuCoolerWithSocket {
            item_id: x.0.item_id.to_owned(),
            name: x.0.name.to_owned(),
            price: x.0.price,
            popular_rank: x.0.popular_rank,
            maker_name: x.0.maker_name.to_owned(),
            product_name: x.0.product_name.to_owned(),
            air_flow_type: x.0.air_flow_type.to_owned(),
            noise_level: x.0.noise_level.to_owned(),
            max_tdp: x.0.max_tdp,
            width: x.0.width,
            height: x.0.height,
            depth: x.0.depth,
            release_date: x.0.release_date,
            is_exist: x.0.is_exist,
            socket_names: x
                .1
                .iter()
                .map(|socket| socket.socket_name.to_owned())
                .collect(),
        })
        .collect();
    Ok((StatusCode::OK, Json(searched_cpu_cooler_with_sockets)).into_response())
}

#[derive(Serialize, Deserialize)]
struct CpuCoolerWithSocket {
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
    pub release_date: Option<Date>,
    pub is_exist: bool,
    pub socket_names: Vec<String>,
}

#[debug_handler]
async fn search_motherboard_handler(
    state: State<AppState>,
    payload: Result<Json<search::motherboard::SearchMotherboardParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_motherboard(state, payload).await
}

async fn search_motherboard(
    state: State<AppState>,
    payload: Result<Json<search::motherboard::SearchMotherboardParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_motherboard_parameter_json = payload?;

    let searched_motherboards =
        search::motherboard::search_motherboard(&state.db, search_motherboard_parameter_json.0)
            .await?;
    Ok((StatusCode::OK, Json(searched_motherboards)).into_response())
}

#[debug_handler]
async fn search_memory_handler(
    state: State<AppState>,
    payload: Result<Json<search::memory::SearchMemoryParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_memory(state, payload).await
}

async fn search_memory(
    state: State<AppState>,
    payload: Result<Json<search::memory::SearchMemoryParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_memory_parameter_json = payload?;

    let searched_memories =
        search::memory::search_memory(&state.db, search_memory_parameter_json.0).await?;
    Ok((StatusCode::OK, Json(searched_memories)).into_response())
}

#[debug_handler]
async fn search_gpu_handler(
    state: State<AppState>,
    payload: Result<Json<search::gpu::SearchGpuParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_gpu(state, payload).await
}

async fn search_gpu(
    state: State<AppState>,
    payload: Result<Json<search::gpu::SearchGpuParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_gpu_parameter_json = payload?;

    let searched_gpus = search::gpu::search_gpu(&state.db, search_gpu_parameter_json.0).await?;
    Ok((StatusCode::OK, Json(searched_gpus)).into_response())
}

#[debug_handler]
async fn search_ssd_handler(
    state: State<AppState>,
    payload: Result<Json<search::ssd::SearchSsdParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_ssd(state, payload).await
}

async fn search_ssd(
    state: State<AppState>,
    payload: Result<Json<search::ssd::SearchSsdParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_ssd_parameter_json = payload?;

    let searched_ssds = search::ssd::search_ssd(&state.db, search_ssd_parameter_json.0).await?;
    Ok((StatusCode::OK, Json(searched_ssds)).into_response())
}

#[debug_handler]
async fn search_hdd_handler(
    state: State<AppState>,
    payload: Result<Json<search::hdd::SearchHddParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_hdd(state, payload).await
}

async fn search_hdd(
    state: State<AppState>,
    payload: Result<Json<search::hdd::SearchHddParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_hdd_parameter_json = payload?;

    let searched_hdds = search::hdd::search_hdd(&state.db, search_hdd_parameter_json.0).await?;
    Ok((StatusCode::OK, Json(searched_hdds)).into_response())
}

#[debug_handler]
async fn search_case_handler(
    state: State<AppState>,
    payload: Result<Json<search::case::SearchCaseParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_case(state, payload).await
}

async fn search_case(
    state: State<AppState>,
    payload: Result<Json<search::case::SearchCaseParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_case_parameter_json = payload?;

    let searched_cases = search::case::search_case(&state.db, search_case_parameter_json.0).await?;
    let searched_case_with_form_factors: Vec<CaseWithFormFactor> = searched_cases
        .iter()
        .map(|x| CaseWithFormFactor {
            item_id: x.0.item_id.to_owned(),
            name: x.0.name.to_owned(),
            price: x.0.price,
            popular_rank: x.0.popular_rank,
            maker_name: x.0.maker_name.to_owned(),
            product_name: x.0.product_name.to_owned(),
            max_gpu_length: x.0.max_gpu_length,
            max_cpu_cooler_height: x.0.max_cpu_cooler_height,
            max_power_supply_size: x.0.max_power_supply_size,
            slot_count: x.0.slot_count,
            drive_bay_information: x.0.drive_bay_information.to_owned(),
            is_low_profile: x.0.is_low_profile,
            weight: x.0.weight,
            width: x.0.width,
            height: x.0.height,
            depth: x.0.depth,
            release_date: x.0.release_date,
            is_exist: x.0.is_exist,
            form_factors: x
                .1
                .iter()
                .map(|form_factor| form_factor.form_factor.to_owned())
                .collect(),
        })
        .collect();
    Ok((StatusCode::OK, Json(searched_case_with_form_factors)).into_response())
}

#[derive(Serialize, Deserialize)]
struct CaseWithFormFactor {
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
    pub release_date: Option<Date>,
    pub is_exist: bool,
    pub form_factors: Vec<String>,
}

#[debug_handler]
async fn search_power_supply_handler(
    state: State<AppState>,
    payload: Result<Json<search::power_supply::SearchPowerSupplyParameter>, JsonRejection>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    search_power_supply(state, payload).await
}

async fn search_power_supply(
    state: State<AppState>,
    payload: Result<Json<search::power_supply::SearchPowerSupplyParameter>, JsonRejection>,
) -> Result<impl IntoResponse, SearchError> {
    let search_power_supply_parameter_json = payload?;

    let searched_power_supplies =
        search::power_supply::search_power_supply(&state.db, search_power_supply_parameter_json.0)
            .await?;
    Ok((StatusCode::OK, Json(searched_power_supplies)).into_response())
}
