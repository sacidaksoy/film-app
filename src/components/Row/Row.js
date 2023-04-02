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
    <div className="container">
      {movies.length > 0 ? (
        <h2>{title}</h2>
      ) : (
        <h2>{'No Match Found'}</h2>
      )}
        <div className='row d-flex align-items-center justify-content-center'>
          {movies?.map((movie) => {
            if (((movie?.backdrop_path !== null && movie?.backdrop_path !== undefined) || (movie?.poster_path !== null && movie?.poster_path !== undefined))) {
              return (
                <div className="col-sm-12 col-md-6 col-lg-4 col-xxl-3">
                  <div className="card w-100" style={{ width: '18rem' }} key={movie.id}>
                    <img
                      className="card-img-top"
                      src={`${base_url}${movie?.backdrop_path || movie?.poster_path}`} alt={movie.name}
                      onClick={() => handleClick(movie)}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.name}</h5>
                      <p className="card-text">{truncate((movie.overview), 100)}</p>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
    </div>
  );
}

export default Row;
