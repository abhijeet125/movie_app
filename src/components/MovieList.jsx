
const MovieList = (props) => {
    const FavMovieList = props.favMovieList;
return  (

<>
{props.movies.map(movie => 

    <div className="col" key={movie.imdbID}>
    <img src={movie.Poster} alt="movie img"/>
    <div className="row" onClick={() => props.addFavMovie(movie)}>

    <FavMovieList />
    </div>
    </div>
   )
}
</>
)

}

export default MovieList;