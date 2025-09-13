import { useFormStore } from "@/src/app/(stack)/formulario-base/store/form-store";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("meuBanco.db");

// Adiciona uma nova receita e retorna o ID
export const adicionarReceita = async (
  nome: string,
  descricao: string,
  data_criacao: string
): Promise<number> => {
  await db.runAsync(
    `INSERT INTO receitas (nome, descricao, data_criacao) VALUES (?, ?, ?)`,
    [nome, descricao, data_criacao]
  );

  const result = await db.getFirstAsync<{ id: number }>(
    `SELECT last_insert_rowid() as id`
  );

  return result.id;
};

// Adiciona ingredientes para uma receita existente
export const adicionarIngredientesParaReceita = async (
  receitaId: number,
  ingredientes: { produtoId: number; quantidade_g: number }[]
) => {
  for (const item of ingredientes) {
    await db.runAsync(
      `INSERT INTO ingredientes (receita_id, produto_id, quantidade_g) VALUES (?, ?, ?)`,
      [receitaId, item.produtoId, item.quantidade_g]
    );
  }
};

// Adiciona receita com ingredientes (recebe nome, descrição, data e ingredientes)
export const adicionarReceitaComIngredientes = async (
  nome: string,
  descricao: string,
  data_criacao: string,
  ingredientes: { produtoId: number; quantidade_g: number }[]
) => {
  const receitaId = await adicionarReceita(nome, descricao, data_criacao);
  await adicionarIngredientesParaReceita(receitaId, ingredientes);
};

// Lista todas as receitas com seus ingredientes e produtos associados
export const listarReceitasComIngredientes = async (): Promise<any[]> => {
  const result = await db.getAllAsync(`
    SELECT
      r.id AS receitaId,
      r.nome AS receitaNome,
      r.data_criacao,
      i.quantidade_g,
      p.id AS produtoId,
      p.nome AS produtoNome,
      p.preco,
      p.gramas
    FROM receitas r
    LEFT JOIN ingredientes i ON i.receita_id = r.id
    LEFT JOIN produtos p ON p.id = i.produto_id;
  `);

  return result;
};

// Lista todas as receitas (sem ingredientes)
export const listarTodasReceitas = async () => {
  const receitas = await db.getAllAsync(`
    SELECT id, nome, descricao, data_criacao FROM receitas;
  `);

  useFormStore.getState().setReceitas(receitas);
  return receitas;
};

export const removerReceita = async (id: number) => {
  await db.runAsync(`DELETE FROM receitas WHERE id = ?`, [id]);
};
