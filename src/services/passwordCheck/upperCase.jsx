export const isUpperCaseAdded = (values) => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYX".split("");
  const isUpperCaseAdded = upper.some((el) => values.includes(el));
  return isUpperCaseAdded;
};
export default isUpperCaseAdded;
