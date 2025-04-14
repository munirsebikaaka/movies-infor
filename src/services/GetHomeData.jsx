import { useEffect } from "react";
import { bookMarkedMoviesAndSeries } from "./bookmarksArr";
const apikey = "ef1735bd";
export function useFetchDetail(
  setMovieDetails,
  setisLoading,
  movieName,
  setError,
  inputMovieName
) {
  useEffect(
    function () {
      async function fetchData() {
        try {
          setisLoading(true);
          const res = await fetch(`
        http://www.omdbapi.com/?apikey=${apikey}&s=${
            !inputMovieName ? movieName : inputMovieName
          }`);

          if (!res.ok)
            throw new Error("Something went wrong with the fetch the data ");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie is not found!");

          if (data.Search.length > 0) {
            const modifiedResults = data.Search.map((el) => {
              const isBookMarked = bookMarkedMoviesAndSeries.find(
                (b) => b.imdbID === el.imdbID
              )
                ? true
                : false;
              return {
                ...el,
                isBookMarked,
              };
            });
            setMovieDetails(modifiedResults);
          } else {
            setMovieDetails([]);
          }
          setisLoading(false);
        } catch (err) {
          setError(err.message);
        }
      }
      fetchData();
    },
    [setMovieDetails, inputMovieName]
  );
}
