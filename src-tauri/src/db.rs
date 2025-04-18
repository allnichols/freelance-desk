use anyhow::Result;
use sqlx::{sqlite::SqlitePool, Pool, Sqlite};
use std::env;
use std::fs;
use tauri::AppHandle;

pub struct Database {
    pub pool: Pool<Sqlite>,
}

impl Database {
    pub async fn new(app_handle: &AppHandle) -> Result<Self> {
        let app_dir = app_handle.path_resolver().app_dir().expect("Failed to get app directory");

        // make sure the app directory exists
        fs::create_dir_all(&app_dir)?;

        let db_path = app_dir.join("app.db");

        // Set the DATABASE_URL environment variable to point to the database file
        env::set_var("DATABASE_URL", format!("sqlite://{}", db_path.display()));

        println!("----------------");
        println!("Initializing database at: {:?}", db_path);
        println!("----------------");

        // Create a connection options to the SQLite database
        let connection_options = sqlx::sqlite::SqliteConnectOptions::new()
            .filename(&db_path)
            .create_if_missing(true)
            .journal_mode(sqlx::sqlite::SqliteJournalMode::Wal);

        // Create a connection pool to the SQLite database
        let pool = SqlitePool::connect_with(connection_options).await?;

        // Run migrations to create the necessary tables
        // sqlx will track which migrations have been run in the database
        sqlx::migrate!("./migrations")
            .run(&pool)
            .await?;

        Ok(Self { pool })
    }
}

// State management for Tauri
#[allow(dead_code)]
pub struct DatabaseState(pub Pool<Sqlite>);