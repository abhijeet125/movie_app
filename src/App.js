import React , {useState, useEffect} from 'react';

import MovieList from './components/MovieList';
import MoviesListHeader from './components/MoviesListHeader';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite';

function App() {
  const [ movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("Hulk");
  const [favMovies, setFavMovies] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6068030b`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.Search){
      setMovies(data.Search);
    }
    
  }
  useEffect(() => {
      getMovieRequest(searchValue);
      
  }, [searchValue])

  useEffect(() => {
    const localStorageMovie = JSON.parse(localStorage.getItem("saved-movie-list"));
    if(localStorageMovie){

      setFavMovies(localStorageMovie);
    }
  }, [])
  const setLocalMovieData = (items) => {
    localStorage.setItem("saved-movie-list" , JSON.stringify(items));
  };

  const favMovieHandler = (movie) => {
    const newFavMovies = [...favMovies , movie];
    setFavMovies(newFavMovies);
    setLocalMovieData(newFavMovies);
  }
  const removeMovieHandler = (movie) => {
    const newFavMovies = favMovies.filter(favMovie => favMovie.imdbID !== movie.imdbID);
    setFavMovies(newFavMovies);
    setLocalMovieData(newFavMovies);
  }
  return (
    <div className="container-fluid">
      <div className='row d-flex align-items-center mt-4 mb-4'>
      <MoviesListHeader heading="Movies Box"/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
     <h1>Welcome to Movie App</h1>
     <div className='row row-cols-auto'>
      <MovieList 
      movies={movies} 
      addFavMovie = {favMovieHandler} 
      favMovieList={AddFavourite}
      />
     </div>
     <div className='row'>
    <MoviesListHeader heading="Favourite Movies" />
     </div>
     <div className="row">
    <MovieList 
    movies={favMovies} 
    addFavMovie = {removeMovieHandler} 
    favMovieList={RemoveFavourite}
    />
      </div>
    </div>
  );
}

export default App;
