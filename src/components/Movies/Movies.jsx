import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { searchMovie } from '../../shared/services/api';
import { LinkToDetails } from './Movies.styled';
import css from './movies.module.css';
import Paginator from 'components/Paginator/Paginator';
import { MagnifyingGlass } from 'react-loader-spinner';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    query: '',
  });

  const [totalPages, settotalPages] = useState(0);
  const location = useLocation();
  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );
  const page = Number(params.page || 1);
  const { query } = params;

  const [inputValue, setInputValue] = useState(query || '');

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await searchMovie(query, page);
        setMovies(data.results);
        setLoading(false);
        settotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [query, page]);

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const searchQuery = e.target.elements.search.value.trim();
    if (searchQuery === '') {
      e.target.reset();
      return;
    }
    setSearchParams({ query: searchQuery, page: 1 });
    e.target.reset();
  };

  return (
    <>
      <div className={css.wrap}>
        <h2 className={css.title}>Search movies:</h2>
        <form onSubmit={handleSubmit} className={css.movieForm}>
          <input
            value={inputValue}
            onChange={handleChange}
            name="search"
            type="text"
            placeholder="Type here"
            className={css.movieInput}
          />
          <button type="submit" className={css.btn}>
            Search
          </button>
        </form>
      </div>
      <ul className={css.list}>
        {query ? (
          loading ? (
            <div className={css.loading}>
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{ margin: '0 auto' }}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>
          ) : movies?.length > 0 ? (
            movies.map(({ title, id, poster_path }) => (
              <li key={id} className={css.listItem}>
                <LinkToDetails
                  state={{ from: location }}
                  to={`/movies/${id}`}
                  cover={poster_path}
                >
                  {title}
                </LinkToDetails>
              </li>
            ))
          ) : (
            <p>
              No movies with this title were found. Try entering another title
            </p>
          )
        ) : (
          <p className={css.descr}></p>
        )}
      </ul>
      <Paginator
        totalPages={totalPages}
        setSearchParams={setSearchParams}
        params={params}
        currentPage={Number(params?.page - 1) || 0}
      />
    </>
  );
};

export default Movies;