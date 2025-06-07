import * as SQLite from "expo-sqlite";

export const logTabelasCriadas = async () => {
  const db = await SQLite.openDatabaseAsync("meuBanco.db");

  try {
    const result = await db.getAllAsync(
      `SELECT name FROM sqlite_master WHERE type='table';`
    );

    console.log("Tabelas encontradas:");
    result.forEach((row) => {
      console.log("🟢", row.name);
    });
  } catch (error) {
    console.error("Erro ao buscar tabelas:", error);
  }
};
