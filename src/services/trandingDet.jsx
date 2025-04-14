import { useEffect } from "react";

const apikey = "ef1735bd";
export function useFetchTranding(setMovieDetails, setisLoading) {
  useEffect(
    function () {
      async function fetchData() {
        try {
          setisLoading(true);
          const res = await fetch(`
        http://www.omdbapi.com/?apikey=${apikey}&s=anaconda`);
          const data = await res.json();
          setMovieDetails(data.Search);
          setisLoading(false);
        } catch {}
      }
      fetchData();
    },
    [setMovieDetails]
  );
}
