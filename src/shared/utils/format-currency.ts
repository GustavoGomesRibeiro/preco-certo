export const formatToBRL = (value: string): string => {
  const numeric = value.replace(/\D/g, ""); // remove tudo que não é número
  const number = Number(numeric) / 100;

  if (isNaN(number)) return "R$ 0,00";

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
