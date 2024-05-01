import defaultPoster from '../../img/no-poster-available.jpg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkToDetails = styled(Link)`
  color: #000;
  text-decoration: none;
  margin: 1px;
  &:hover,
  &:focus {
    color: #ff3cac;
  }
  @media screen and (min-width: 768px) {
    &:hover::after,
    &:focus::after {
      content: '';
      background-image: ${props =>
        props.cover
          ? `url('https://image.tmdb.org/t/p/w500/${props.cover}')`
          : `url(${defaultPoster})`};
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 160px;
      height: 240px;
      display: block;
      border-radius: 4px;
      border: 1px solid rgba(43, 134, 197);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      position: absolute;
      top: -140px;
      left: 500px;
      z-index: 1;
    }
  }
`;