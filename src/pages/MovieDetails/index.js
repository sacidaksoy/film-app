import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import MovieViewCard from '../../components/MovieViewCard/MovieViewCard'
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import { useNavigate } from "react-router-dom";
import axios from '../../axios'
import { useDispatch, useSelector } from 'react-redux';
import { movieActions } from '../../store/slices';

function MovieDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movieDetails, setMovieDetails] = useState()

  const { searchFilter, movies } = useSelector((state) => state.movie);

  const handleTurnBack = () => {
    dispatch(movieActions.setFilterValue(''));
    navigate('/');
  }

  const fetchMovies = async (searchKey) => {
    try {
      const type = searchKey ? '/search/multi' : '/discover/tv';
      const request = await axios.get(`${type}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          with_networks: "213",
          query: searchFilter
        }
      });
      dispatch(movieActions.setMovies(request.data.results));
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  const fetchMovieDetails = async (id) => {
    try {
      const requestTV = await axios.get(`/tv/${id}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        }
      });
      setMovieDetails(requestTV.data);
    } catch (error) {
      const requestMovie = await axios.get(`/movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        }
      });
      setMovieDetails(requestMovie.data);
      console.log(error);
    } finally {
    }
  }

  const handleChange = (e) => {
    dispatch(movieActions.setFilterValue(e.target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(searchFilter).then(() => {
      dispatch(movieActions.setPreventReload(true));
      navigate('/');
    })
  }

  useEffect(() => {
    fetchMovieDetails(Number(params.id));
  }, [params])

  console.log("movieDetails", movieDetails);
  console.log(params.id);

  return (
    <React.Fragment>
      <Banner movie={movieDetails} turnback handleTurnBack={handleTurnBack}/>
      <SearchFilter searchValue={searchFilter} handleChange={handleChange} handleSubmit={handleSubmit} data={movies}/>
      <MovieViewCard movie={movieDetails} />
    </React.Fragment>
  )
}

export default MovieDetail