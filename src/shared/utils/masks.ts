export interface MaskMethods {
  mask: (value: string) => string;
  unmask: (value: string) => string;
}

export interface MaskMethodsCurency {
  mask: (value: string | number) => string;
  unmask: (value: string) => string;
}

export interface CommomMasks {
  currency: MaskMethodsCurency;
  currencyInput: MaskMethodsCurency;
}

function unmask(mask: string) {
  return mask?.replace(/(\.)?(-)?([/])?/g, "");
}

const masks: CommomMasks = {
  currency: {
    mask(value: string | number = 0) {
      if (typeof value === "string") {
        return masks.currencyInput.mask(value);
      }
      const finalValue = value
        ?.toFixed(2)
        .replace(".", ",")
        .replace(/\d(?=(\d{3})+,)/g, "$&.");
      return `R$ ${finalValue}`;
    },
    unmask(mask: string) {
      return mask.replace(/\D/g, "");
    },
  },
  currencyInput: {
    mask(value: string | number) {
      let newValue = `${value}`.replace(/\R\$/g, "");
      newValue = newValue.replace(",", "").split(".").join("");
      const valueParsed = parseFloat(newValue);

      return newValue === "" ? "" : masks.currency.mask(valueParsed / 100);
    },
    unmask(mask: string) {
      return mask.replace(/\D/g, "");
    },
  },
};

export default masks;
