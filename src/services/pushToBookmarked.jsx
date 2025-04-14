export function pushToMarked(action, imdbID, setAction) {
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
