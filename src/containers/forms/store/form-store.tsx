import { create } from "zustand";

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  gramas: number;
};

type InputItem = {
  preco: string;
  gramas: string;
};

type FormStore = {
  produtos: Produto[];
  produtoSelecionado?: Produto | null;
  inputs: InputItem[];
  selectedProducts: (number | null)[];
  custos: number[];
  totalCusto: number;
  lucroDesejado: number;
  unidades: number;
  precoEmbalagem: number;
  setPrecoEmbalagem: (valor: number) => void;
  setUnidades: (valor: number) => void;
  setLucroDesejado: (valor: number) => void;
  setTotalCusto: (valor: number) => void;
  addInput: () => void;
  removeInput: (idx: number) => void;
  setInput: (idx: number, field: "preco" | "gramas", value: string) => void;
  setSelectedProduct: (
    idx: number,
    produtoId: number,
    produtos: Produto[]
  ) => void;
  setCusto: (idx: number, custo: number) => void;
  resetAll: () => void;
  setProdutoSelecionado: (produto: Produto | null) => void;
  setProdutos: (produtos: Produto[]) => void;
  addProduto: (produto: Produto) => void;
  removeAllProdutos: () => void;
  removeProduto: (id: number) => void;
};

const useFormStore = create<FormStore>((set) => ({
  produtos: [],
  produtoSelecionado: null,
  inputs: [{ preco: "", gramas: "" }],
  selectedProducts: [null],
  custos: [0],
  totalCusto: 0,
  lucroDesejado: 0,
  unidades: 0,
  precoEmbalagem: 0,
  setPrecoEmbalagem: (valor: number) => set({ totalCusto: valor }),
  setUnidades: (valor: number) => set({ totalCusto: valor }),
  setLucroDesejado: (valor: number) => set({ totalCusto: valor }),
  setTotalCusto: (valor: number) => set({ totalCusto: valor }),
  setProdutoSelecionado: (produto) => set({ produtoSelecionado: produto }),
  addProduto: (produto) =>
    set((state) => ({ produtos: [...state.produtos, produto] })),
  setProdutos: (produtos) => set({ produtos }),
  removeProduto: (id) =>
    set((state) => ({
      produtos: state.produtos.filter((p) => p.id !== id),
    })),
  removeAllProdutos: () => set({ produtos: [] }),
  addInput: () =>
    set((state) => ({
      inputs: [...state.inputs, { preco: "", gramas: "" }],
      selectedProducts: [...state.selectedProducts, null],
      custos: [...state.custos, 0],
    })),
  removeInput: (idx) =>
    set((state) => ({
      inputs: state.inputs.filter((_, i) => i !== idx),
      selectedProducts: state.selectedProducts.filter((_, i) => i !== idx),
      custos: state.custos.filter((_, i) => i !== idx),
    })),
  setInput: (idx, field, value) =>
    set((state) => ({
      inputs: state.inputs.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    })),
  setSelectedProduct: (idx, produtoId, produtos) =>
    set((state) => {
      const produto = produtos.find((p) => p.id === produtoId);
      return {
        selectedProducts: state.selectedProducts.map((v, i) =>
          i === idx ? produtoId : v
        ),
        inputs: state.inputs.map((item, i) =>
          i === idx && produto
            ? {
                preco: produto.preco.toString(),
                gramas: produto.gramas.toString(),
              }
            : item
        ),
      };
    }),
  setCusto: (idx, custo) =>
    set((state) => ({
      custos: state.custos.map((c, i) => (i === idx ? custo : c)),
    })),
  resetAll: () =>
    set({
      inputs: [{ preco: "", gramas: "" }],
      selectedProducts: [null],
      custos: [0],
    }),
}));

export default useFormStore;
