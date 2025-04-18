use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:mydatabase.db", 
        vec![
                Migration {
                    version:1,
                    description: "create clients table",
                    kind: MigrationKind::Up,
                    sql: r#"
                        CREATE TABLE IF NOT EXISTS clients ( 
                            id integer PRIMARY KEY AUTOINCREMENT,
                            name text NOT NULL,
                            email text NOT NULL,
                            phone text NOT NULL,
                            address text NOT NULL,
                            created_at datetime DEFAULT CURRENT_TIMESTAMP,
                            updated_at datetime DEFAULT CURRENT_TIMESTAMP
                        );
                    "#,
                },
                Migration {
                    version: 2,
                    description: "create invoices table",
                    kind: MigrationKind::Up,
                    sql: r#"
                        CREATE TABLE IF NOT EXISTS invoices (
                            id integer PRIMARY KEY AUTOINCREMENT,
                            client_id integer NOT NULL,
                            invoice_number text NOT NULL UNIQUE,
                            issue_date date NOT NULL,
                            total_amount real NOT NULL DEFAULT 0.0,
                            due_date date NOT NULL,
                            status text NOT NULL default 'unpaid',
                            notes text,
                            created_at datetime DEFAULT CURRENT_TIMESTAMP,
                            updated_at datetime DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE
                        );
                    "#,
                },
                Migration {
                    version: 3,
                    description: "create invoice_items table",
                    kind: MigrationKind::Up,
                    sql: r#"
                        CREATE TABLE IF NOT EXISTS invoice_items (
                            id integer PRIMARY KEY AUTOINCREMENT,
                            invoice_id integer NOT NULL,
                            description text NOT NULL,
                            quantity integer NOT NULL DEFAULT 1,
                            unit_price real NOT NULL DEFAULT 0.0,
                            total real NOT NULL DEFAULT 0.0,
                            created_at datetime DEFAULT CURRENT_TIMESTAMP,
                            updated_at datetime DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE
                        );
                    "#,
                },
                    Migration {
                        version: 4, 
                        description: "create payments table",
                        kind: MigrationKind::Up,
                        sql: r#"
                            CREATE TABLE IF NOT EXISTS payments (
                                id integer PRIMARY KEY AUTOINCREMENT,
                                invoice_id integer NOT NULL,
                                amount real NOT NULL DEFAULT 0.0,
                                payment_date date NOT NULL,
                                payment_method text NOT NULL,
                                notes text,
                                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                                updated_at datetime DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE
                            );
                        "#,
                    }
            ]).build())
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
