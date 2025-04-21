import { useEffect } from "react";

const useGetDefaultProfilePicture = (
  logedInEmail,
  setFirstLetters,
  setLastLetters
) => {
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("acounts"));
    const getFirsLetterName = () =>
      accounts
        .filter((el) => el.email === logedInEmail)
        .map((el) => el.firstName)
        .join("");
    setFirstLetters(getFirsLetterName());

    const getLastLetterName = () =>
      accounts
        .filter((el) => el.email === logedInEmail)
        .map((el) => el.lastName)
        .join("");
    setLastLetters(getLastLetterName());
  }, []);
};
export default useGetDefaultProfilePicture;
