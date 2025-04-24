export const isSymbolsAdded = (values) => {
  const symbols = `!@#$%^&*()|<>,./?'"+=`.split("");
  const symbolsAdded = symbols.some((el) => values.includes(el));
  return symbolsAdded;
};
export default isSymbolsAdded;
