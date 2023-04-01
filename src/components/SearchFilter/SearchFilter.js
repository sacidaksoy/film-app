import React, { useEffect, useState } from 'react'
import './searchFilter.css'
import useDebounce from '../../utils/useDebounce'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';

function SearchFilter({ searchValue, handleChange, handleSubmit }) {
  const debouncedValue = useDebounce(searchValue, 500);
  const navigate = useNavigate();
  const [filteredMovies, setFilteredMovies] = useState([])

  const fetchMovies = async (searchKey) => {
    try {
      const request = await axios.get(`/search/multi`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          with_networks: "213",
          query: searchKey
        }
      });
      setFilteredMovies(request.data.results);
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  const handleChangeDataList = (e) => {
    const { value } = e.target;
    for (var i = 0; i < filteredMovies.length; i++) {
      if (filteredMovies[i].name === value) {
        navigate(`/movies/${filteredMovies[i].id}`)
        break;
      }
    }
  }

  useEffect(() => {
    fetchMovies(debouncedValue)
  }, [debouncedValue])

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movies, actors, shows"
        autoFocus
        list="cityname"
        value={searchValue}
        onChange={handleChange}
        onInput={handleChangeDataList}
      />
      <button type='submit'>Search</button>
      <datalist id="cityname">
        {
          filteredMovies?.map((item) => item.name).filter(item => {
            if (searchValue === '') {
              //if search is empty
              return item;
            } else if (item?.toLocaleLowerCase('tr').includes(debouncedValue?.toLocaleLowerCase('tr'))) {
              //returns filtered array
              return item;
            }
          }).map((item, index) => {
            return (
              <option value={item} key={index} />
            )
          })
        }
      </datalist>

    </form>
  )
}

export default SearchFilter