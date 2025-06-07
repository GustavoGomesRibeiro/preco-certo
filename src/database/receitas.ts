import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("meuBanco.db");

// Adiciona uma receita com seus ingredientes
export const adicionarReceitaComIngredientes = (
  nome: string,
  descricao: string,
  data: string,
  ingredientes: { produtoId: number; quantidade_g: number }[]
) => {
  db.withTransactionSync((tx) => {
    // Inserir receita
    tx.executeSqlSync(
      `INSERT INTO receitas (nome, descricao, data_criacao) VALUES (?, ?, ?);`,
      [nome, descricao, data]
    );

    // Obter ID da última receita inserida
    const result = tx.executeSqlSync(`SELECT last_insert_rowid() AS id;`);
    const receitaId = result.rows[0]?.id;

    // Inserir ingredientes
    ingredientes.forEach((item) => {
      tx.executeSqlSync(
        `INSERT INTO ingredientes (receita_id, produto_id, quantidade_g) VALUES (?, ?, ?);`,
        [receitaId, item.produtoId, item.quantidade_g]
      );
    });
  });
};

// Lista todas as receitas com seus ingredientes
export const listarReceitasComIngredientes = (): any[] => {
  let dados: any[] = [];

  db.withTransactionSync((tx) => {
    const result = tx.executeSqlSync(`
      SELECT r.id as receitaId, r.nome as receitaNome, r.data_criacao,
             i.quantidade_g,
             p.id as produtoId, p.nome as produtoNome, p.preco, p.gramas
      FROM receitas r
      LEFT JOIN ingredientes i ON i.receita_id = r.id
      LEFT JOIN produtos p ON p.id = i.produto_id;
    `);

    dados = result.rows;
  });

  return dados;
};
