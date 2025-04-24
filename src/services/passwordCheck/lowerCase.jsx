export const isLowerCaseAdded = (values) => {
  const lower = "abcdefghijklmnopqrstuvwxyz".split("");
  const isUpperCaseAdded = lower.some((el) => values.includes(el));
  return isUpperCaseAdded;
};
export default isLowerCaseAdded;
