export const getFontSizeForAmount = (amount: string) => {
  const length = amount.length;
  if (length > 12) {
    return "2.5em";
  }
  if (length > 9) {
    return "3em";
  }
  // Utiliza el tamaño por defecto definido en el CSS
  return "3.5em";
};
