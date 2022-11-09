use sea_orm::ConnectOptions;
use sea_orm::Database;
use sea_orm::{DatabaseConnection, DbErr};

use dotenvy;
use std::env;
use std::time::Duration;

pub async fn create_db_connection() -> Result<DatabaseConnection, DbErr> {
    dotenvy::dotenv().ok();
    let db_uri = env::var("DATABASE_URL").unwrap();
    let mut opt = ConnectOptions::new(db_uri.to_owned());
    opt.max_connections(150)
        .min_connections(1)
        .connect_timeout(Duration::from_secs(8))
        .idle_timeout(Duration::from_secs(8))
        .max_lifetime(Duration::from_secs(8))
        .sqlx_logging(true)
        .sqlx_logging_level(log::LevelFilter::Info);
    let db = Database::connect(opt).await;
    return db;
}
