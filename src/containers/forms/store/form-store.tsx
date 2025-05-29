import { create } from "zustand";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

type FormStore = {
  produtos: Produto[];
  produtoSelecionado?: Produto | null;
  setProdutoSelecionado: (produto: Produto | null) => void;
  addProduto: (produto: Produto) => void;
  removeAllProdutos: () => void;
  removeProduto: (id: number) => void;
};

const useFormStore = create<FormStore>((set) => ({
  produtos: [],
  produtoSelecionado: null,
  setProdutoSelecionado: (produto) => set({ produtoSelecionado: produto }),
  addProduto: (produto) =>
    set((state) => ({ produtos: [...state.produtos, produto] })),
  removeProduto: (id) =>
    set((state) => ({
      produtos: state.produtos.filter((p) => p.id !== id),
    })),
  removeAllProdutos: () => set({ produtos: [] }),
}));

export default useFormStore;
