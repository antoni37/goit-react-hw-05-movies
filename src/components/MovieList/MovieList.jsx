import { ListMovies, MovieItem, StyledLink } from './movieList.styled';

const MovieList = ({ movies, location }) => {
  return (
    <>
      <ListMovies>
        {movies.map(({ title, id }) => (
          <MovieItem key={id}>
            <StyledLink to={`/movies/${id}`} state={{ from: location }}>
              {title}
            </StyledLink>
          </MovieItem>
        ))}
      </ListMovies>
    </>
  );
};

export default MovieList;