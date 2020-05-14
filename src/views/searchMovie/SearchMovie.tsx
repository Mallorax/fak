import React from 'react';
import NavPanel from '../../components/navPanel/NavPanel'
import movieService, { IMoviesProps } from '../../services/movies.service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: '650px',
  }
});


const SearchMovie = () => {
  const classes = useStyles();
  const [movies, setMovies] = React.useState<IMoviesProps | null>(null);
  const [movieToSearch, setMovieToSearch] = React.useState('');

  React.useEffect(() => {
    movieService.searchByName(movieToSearch).then(resp => {
      if (resp) {
        setMovies(resp);
      }
    });

    movieService.searchById('tt0848228');
  }, [movieToSearch]);


  return (
    <div>
      <NavPanel/>
      <input
        placeholder="Enter movie name"
        onChange={event => setMovieToSearch(event.target.value)}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell> Poster</TableCell>
              <TableCell align="right"> Title</TableCell>
              <TableCell align="right"> Type</TableCell>
              <TableCell align="right"> Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!movies?.movies.length &&
            movies?.movies.map(movie => (
              <TableRow key={movie.id}>
                <TableCell>
                  <img src={movie.poster}
                       alt={movie.title}/>
                </TableCell>
                <TableCell align="right"> {movie.title}</TableCell>
                <TableCell align="right"> {movie.type}</TableCell>
                <TableCell align="right"> {movie.year}</TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchMovie;
