import * as React from 'react'
import {useLocation} from "react-router";
import movieService, {IMovieResponse} from "../../services/movies.service";
import {useState} from "react";
import NavPanel from "../../components/navPanel/NavPanel";

interface MovieDetails {
    Title: string


}
const MovieDetails = () => {
    const location = useLocation()
    const locationArr = location.pathname.split('/')
    const movieId = locationArr[locationArr.length - 1]
    const [movieDetails, setMovieDetails] = useState<IMovieResponse | null>(null)

    React.useEffect(() => {
        movieService.searchById(movieId).then(resp => {
            if (resp) {
                setMovieDetails(resp as IMovieResponse)
            }
        });
    }, []);
    if (!movieDetails){
        return null
    }
    const {Title, Actors, Director, Genre, Poster, Released, Type, imdbRating, Country, Plot} = movieDetails

    return (
        <div>
            <NavPanel/>
            <div>Title: {Title}</div>
            <img src={Poster} alt={Title}/>
            <div>Director: {Director}</div>
            <div>Actors: {Actors}</div>
            <div>Genre: {Genre}</div>
            <div>Type: {Type}</div>
            <div>Country: {Country}</div>
            <div>Released: {Released}</div>
            <div>{Plot}</div>
            <div>Rating: {imdbRating}</div>
        </div>
    )

}

export default MovieDetails