import React from 'react'
import { base_url } from '../Row/Row';
import './banner.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { movieActions } from '../../store/slices';

function Banner({ movie, turnback, handleTurnBack }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    const handleClick = () => {
        navigate(`/movies/${movie?.id}`,
            {
                state: { movie }
            }
        )
        dispatch(movieActions.setFilterValue(''));
    }

    return (
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
            // backgroundPosition: "center center"
        }}>
            <div className='banner__contents'>
                <h1 className='banner__title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className='banner__buttons'>
                    <button className='banner__button' onClick={handleClick}>View</button>
                    {turnback ? (
                        <button className='banner__button' onClick={handleTurnBack}>Turn Back</button>
                    ) : null}
                </div>
                <h1 className='banner__description'>
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className='banner--fadeBottom'>
                {/* <form onSubmit={searchMovies}>
                    <input type='text' onChange={changeHandler} />
                    <button type='submit'>Search</button>
                    {searchValue}
                </form> */}
            </div>

        </header>
    )
}

export default Banner