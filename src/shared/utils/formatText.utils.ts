export const getFontSizeForAmount = (amount: string) => {
  const length = amount.length;

  if (length > 8) {
    return "2.8em";
  }
  if (length > 7) {
    return "3em";
  }
  // Utiliza el tamaño por defecto definido en el CSS
  return "3.5em";
};
