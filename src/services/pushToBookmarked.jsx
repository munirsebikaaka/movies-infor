import { logedInEmail } from "./bookmarksArr";
export const pushToMarked = (action, imdbID, setAction) => {
  action.map((el) => {
    if (el.imdbID === imdbID) {
      let bookmarkedMoviesAndSeries = [];

      bookmarkedMoviesAndSeries = JSON.parse(
        localStorage.getItem("moviesAndSeries" || "[]")
      );
      const newMovieOrSeries = { ...el, email: logedInEmail };
      bookmarkedMoviesAndSeries.push(newMovieOrSeries);
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
