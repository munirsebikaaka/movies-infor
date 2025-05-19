import { logedInEmail } from "./bookmarksArr";

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
  setAction(
    action.map((items) =>
      items.imdbID === imdbID ? { ...items, isBookMarked: true } : items
    )
  );
};
