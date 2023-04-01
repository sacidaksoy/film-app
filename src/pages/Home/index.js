import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from '../../components/Row/Row';
import Banner from '../../components/Banner/Banner';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import axios from '../../axios';
import { movieActions } from '../../store/slices';

function Home() {
  const { movies, featuredMovie, searchFilter, preventReload } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

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
      dispatch(movieActions.setFeaturedMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]));
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  useEffect(() => {
    if (searchFilter === '') {
      fetchMovies();
    }
  }, [searchFilter])

  useEffect(() => {
    if (preventReload) {
      return;
    } else {
      fetchMovies();
    }
  }, []);

  const handleChange = (e) => {
    dispatch(movieActions.setFilterValue(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(searchFilter);
  }

  return (
    <React.Fragment>
      <Banner movie={featuredMovie} />
      <SearchFilter searchValue={searchFilter} handleChange={handleChange} handleSubmit={handleSubmit} />
      <Row title="NETFLIX ORIGINALS" movies={movies} />
    </React.Fragment>
  );
}

export default Home;
