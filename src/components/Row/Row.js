import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import requestService from "../../RequestServices"

const base_url = "https://image.tmdb.org/t/p/original/";

function Row(props) {
  const [movies, setMovies] = useState([]);

  // Code which runs on a specific condition
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(props.fetchUrl);

      // <-- Gets only the movies with image path -->
      let resultsArr = requestService.GetOnlyMoviesWithImgPath(request);

      request.data.results = resultsArr;
      // <-- -->

      setMovies(request.data.results);

      return request;
    }

    fetchData();

    // if deps[] is empty run once and don't run again,
    // otherwise effect will only activate if the values in the list change.
  }, [props.fetchUrl]);

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row-poster ${props.isLargeRow && "row-posterLarge"}`}
            src={`${base_url}${
              props.isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;