import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../shared/services/api';
import { MagnifyingGlass } from 'react-loader-spinner';
import css from './reviews.module.css';

const Reviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { results } = await getMovieReviews(movieId);
        setData(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <>
      {loading ? (
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
      ) : data && data.length > 0 ? (
        <div className={css.listWrap}>
          <ul className={css.list}>
            {data.map(({ author, content, id }) => (
              <li key={id} className={css.listItem}>
                <p className={css.listName}>{author}</p>
                {content && content}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={css.error}>No reviews found</p>
      )}
    </>
  );
};

export default Reviews;