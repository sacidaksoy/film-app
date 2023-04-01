import React from 'react'
import './movieViewCard.css'
import { base_url } from '../Row/Row'


function MovieViewCard({ movie }) {
  return (
    <div className="movie_card" id="bright">
      <div className="info_section">
        <div className="movie_header">
          <img className="locandina" src={`${base_url}${movie?.backdrop_path || movie?.poster_path}`} />
          <a href={movie?.homepage} target='_blank'><h1>{movie?.title || movie?.name}</h1></a>
          <h4>{movie?.release_date || movie?.first_air_date}, {movie?.original_language}</h4>
          <span className="minutes">{movie?.vote_average}</span>
          <p className="type">
            {movie?.genres.map((item) => {
              return (
                <span>{' '} {item.name}</span>
              )
            })}
          </p>
        </div>
        <div className="movie_desc">
          <p className="text">
            {movie?.overview}
          </p>
        </div>
      </div>
      <div className="blur_back bright_back" style={{ background: `url(${base_url}${movie?.backdrop_path})` }}></div>
    </div>
  )
}

export default MovieViewCard