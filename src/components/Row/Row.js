import React from "react";
import './row.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { movieActions } from "../../store/slices";

export const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, movies }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = (movie) => {
    navigate(`/movies/${movie.id}`,
      {
        state: { movie }
      }
    );
    dispatch(movieActions.setFilterValue(''));
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className="row__container">
      {movies.length > 0 ? (
        <h2>{title}</h2>
      ) : (
        <h2>{'No Match Found'}</h2>
      )}
      <div className="row__wrapper">
        {movies?.map((movie) => {
          if ((movie?.backdrop_path !== null || movie?.poster_path !== null)) {
            return (
              <div className="row__card">
                <img
                  key={movie?.id}
                  onClick={() => handleClick(movie)}
                  className={`row__poster`}
                  style={{ cursor: 'pointer' }}
                  src={`${base_url}${movie?.backdrop_path || movie?.poster_path}`}
                  alt={movie?.name}
                />
                <div className="row__description">
                  <h4><b>{movie.name}</b></h4>
                  <p>{truncate((movie.overview), 100)}</p>
                </div>
              </div>
            )
          } else {
            return;
          }
        })}
      </div>
    </div>
  );
}

export default Row;
