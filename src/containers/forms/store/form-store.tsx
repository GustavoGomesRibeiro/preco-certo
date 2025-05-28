import { create } from "zustand";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

type FormStore = {
  produtos: Produto[];
  addProduto: (produto: Produto) => void;
  removeAllProdutos: () => void;
  removeProduto: (id: number) => void;
};

const useFormStore = create<FormStore>((set) => ({
  produtos: [],
  addProduto: (produto) =>
    set((state) => ({ produtos: [...state.produtos, produto] })),
  removeProduto: (id) =>
    set((state) => ({
      produtos: state.produtos.filter((p) => p.id !== id),
    })),
  removeAllProdutos: () => set({ produtos: [] }),
}));

export default useFormStore;
