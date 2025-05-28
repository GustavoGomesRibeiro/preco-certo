import axios from "axios";

export const fetchAlimentos = async (termo: string) => {
  try {
    const response = await axios.get(
      "https://world.openfoodfacts.org/cgi/search.pl",
      {
        params: {
          search_terms: termo,
          search_simple: 1,
          action: "process",
          json: 1,
        },
      }
    );

    const produtos = response.data.products;

    console.log("Produtos encontrados:", produtos);
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar alimentos:", error);
    return [];
  }
};
