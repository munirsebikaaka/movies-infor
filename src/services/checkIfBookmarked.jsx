const useCheckIfElInBookmarkedIsInOtherArraysBasedOnLogedInAccount = (
  OthrArrays,
  bookMarked,
  accountID
) => {
  //   const accountID = localStorage.getItem("accountID");
  if (bookMarked.length < 1) return;
  bookMarked.map((el) => {
    if (el.storeId === accountID) {
      OthrArrays.forEach((item) => {
        if (item.imdbID === el.imdbID) {
          item.isbookmarked = true;
          console.log(
            `Item with imdbID ${item.imdbID} is bookmarked for account ${accountID}`
          );
        }
      });
    }
  });
};

export default useCheckIfElInBookmarkedIsInOtherArraysBasedOnLogedInAccount;
