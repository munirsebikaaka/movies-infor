export const isNumbersAdded = (values) => {
  const numbers = "1234567890".split("");
  const numbersAdded = numbers.some((el) => values.includes(el));
  return numbersAdded;
};
export default isNumbersAdded;
