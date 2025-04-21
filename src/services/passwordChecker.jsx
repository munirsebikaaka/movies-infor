const checkIfPasswordIsValid = (values) => {
  const nums = "1234567890".split("");
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYX".split("");
  const lower = "abcdefghijklmnopqrstuvwxyz".split("");
  const symboles = `!@#$%^&*()<>>?":|.,+-=_'`.split("");
  const isPasswordStrong =
    nums.some((el) => values.includes(el)) &&
    lower.some((el) => values.includes(el)) &&
    upper.some((el) => values.includes(el)) &&
    symboles.some((el) => values.includes(el));
  return isPasswordStrong;
};
export default checkIfPasswordIsValid;
