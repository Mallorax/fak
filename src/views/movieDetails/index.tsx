import * as React from 'react'
import {useLocation} from "react-router";
import movieService, {IMovieResponse} from "../../services/movies.service";
import {useState} from "react";
import NavPanel from "../../components/navPanel/NavPanel";
import {makeStyles, Theme} from "@material-ui/core/styles";

interface MovieDetails {
    Title: string


}

const useStyles = makeStyles(() => ({
    title: {
        textAlign: "center",
        margin: '20px',
        fontSize: '30px',
        fontWeight: "bold"
    },
    container: {
        display: 'flex'
    },
    image: {
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    description: {},
    rating:{
        fontWeight: 'bold',
        fontSize: '20px'
    }


}))


const MovieDetails = () => {
    const location = useLocation()
    const locationArr = location.pathname.split('/')
    const movieId = locationArr[locationArr.length - 1]
    const [movieDetails, setMovieDetails] = useState<IMovieResponse | null>(null)
    const styles = useStyles({})


    React.useEffect(() => {
        movieService.searchById(movieId).then(resp => {
            if (resp) {
                setMovieDetails(resp as IMovieResponse)
            }
        });
    }, []);
    if (!movieDetails) {
        return null
    }
    const {Title, Actors, Director, Genre, Poster, Released, Type, imdbRating, Country, Plot} = movieDetails

    return (
        <div>
            <NavPanel/>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img src={Poster} alt={Title}/>
                    <div className={styles.rating}>Rating: {imdbRating}</div>
                    <button type={"button"} onClick={handleAddToFavourites}>Add to favourites</button>
                </div>
                <div className={styles.description}>
                    <div className={styles.title}>Title: {Title}</div>
                    <div>Director: {Director}</div>
                    <div>Actors: {Actors}</div>
                    <div>Genre: {Genre}</div>
                    <div>Type: {Type}</div>
                    <div>Country: {Country}</div>
                    <div>Released: {Released}</div>
                    <div>Plot:</div>
                    <div>{Plot}</div>
                </div>
            </div>
        </div>
    )

}

export default MovieDetails