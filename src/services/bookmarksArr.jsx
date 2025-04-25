export const bookMarkedMoviesAndSeries = JSON.parse(
  localStorage.getItem("moviesAndSeries")
);
export const logedInEmail = localStorage.getItem("email");
const moviesAndTVSeries = JSON.parse(
  localStorage.getItem("bookmarkedAccMoviesAndTVSeries")
);
console.log(moviesAndTVSeries);
