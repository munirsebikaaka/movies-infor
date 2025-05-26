export const pushToMarked = (action, imdbID, setAction) => {
  const accountID = localStorage.getItem("accountID");
  action.map((el) => {
    if (el.imdbID === imdbID) {
      let bookmarkedMoviesAndSeries = [];

      bookmarkedMoviesAndSeries = JSON.parse(
        localStorage.getItem("moviesAndSeries") || "[]"
      );
      bookmarkedMoviesAndSeries.push({
        ...el,
        storeId: accountID,
      });

      localStorage.setItem(
        "moviesAndSeries",
        JSON.stringify(bookmarkedMoviesAndSeries)
      );
    }
  });
  const bookmarked = JSON.parse(
    localStorage.getItem("moviesAndSeries") || "[]"
  );
  bookmarked.map((bookmarkedMOrS) => {
    if (bookmarkedMOrS.storeId === accountID) {
      setAction((prev) => {
        return prev.map((el) => {
          if (el.imdbID === bookmarkedMOrS.imdbID) {
            return { ...el, isBookMarked: true };
          }
          return el;
        });
      });
    }
  });
};
