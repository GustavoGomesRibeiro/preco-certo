import * as SQLite from "expo-sqlite";
import useFormStore, { Produto } from "../containers/forms/store/form-store";

const db = SQLite.openDatabaseSync("meuBanco.db");

export const adicionarProduto = async (
  nome: string,
  preco: number,
  gramas: number
) => {
  await db.runAsync(
    `INSERT INTO produtos (nome, preco, gramas) VALUES (?, ?, ?)`,
    [nome, preco, gramas]
  );
};

export const listarProdutos = async () => {
  const produtos = await db.getAllAsync<Produto>("SELECT * FROM produtos;");
  useFormStore.getState().setProdutos(produtos);

  return produtos;
};

export const atualizarProduto = async (
  nome: string,
  preco: number,
  gramas: number,
  id: number
) => {
  const updateProdutos = await db.runAsync(
    `UPDATE produtos SET nome = ?, preco = ?, gramas = ?  WHERE id = ?`,
    nome,
    preco,
    gramas,
    id
  );

  return updateProdutos;
};

export const removerProduto = async (id: number) => {
  await db.runAsync(`DELETE FROM produtos WHERE id = ?`, [id]);
};
