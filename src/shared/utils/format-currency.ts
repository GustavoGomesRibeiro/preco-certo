export const formatToBRL = (value: string): string => {
  const numeric = value.replace(/\D/g, ""); // remove tudo que não é número
  const number = Number(numeric) / 100;

  if (isNaN(number)) return "R$ 0,00";

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export function formatToBRLCustoTotal(value: number | undefined | null) {
  const safeValue = typeof value === "number" ? value : 0;
  return safeValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseBRL(value: string): number {
  if (!value) return 0;
  return Number(
    value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
  );
}
