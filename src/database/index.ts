import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("meuBanco.db");

export const initDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      gramas REAL NOT NULL
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      data_criacao TEXT NOT NULL
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ingredientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      receita_id INTEGER NOT NULL,
      produto_id INTEGER NOT NULL,
      quantidade_g REAL NOT NULL,
      FOREIGN KEY (receita_id) REFERENCES receitas(id),
      FOREIGN KEY (produto_id) REFERENCES produtos(id)
    );
  `);
};
