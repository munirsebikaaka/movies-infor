import { logedInEmail } from "./bookmarksArr";

/*export function pushToMarked(action, imdbID, setAction) {
  action.map((el) => {
    if (el.imdbID === imdbID) {
      let bookmarkedMoviesAndSeries = [];

      bookmarkedMoviesAndSeries = JSON.parse(
        localStorage.getItem("moviesAndSeries") || "[]"
      );
      bookmarkedMoviesAndSeries.push(el);
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
}
  */
export function pushToMarked(action, imdbID, setAction) {
  action.map((el) => {
    if (el.imdbID === imdbID) {
      let bookmarkedMoviesAndSeriesForAccount = [
        { accountEmail: logedInEmail },
        [],
      ];

      bookmarkedMoviesAndSeriesForAccount = JSON.parse(
        localStorage.getItem("bookmarkedAccMoviesAndTVSeries") || "[]"
      );
      bookmarkedMoviesAndSeriesForAccount[1].push(el);
      localStorage.setItem(
        "bookmarkedAccMoviesAndTVSeries",
        JSON.stringify(bookmarkedMoviesAndSeriesForAccount)
      );

      let bookmarkedMoviesAndSeries = [];
      bookmarkedMoviesAndSeries = JSON.parse(
        localStorage.getItem("moviesAndSeries") || "[]"
      );
      bookmarkedMoviesAndSeries.push(el);
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
}
