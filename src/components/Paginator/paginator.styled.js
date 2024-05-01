import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

export const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 10px 0;
  font-size: 18px;
  .selected {
    color: white;
    background-color: orange;
    &:hover {
      background-color: orangered;
    }
  }

  a {
    display: block;
    padding: 5px 10px;
    cursor: pointer;
  }

  li {
    list-style-type: none;
    border: 1px solid orange;
    border-radius: 7px;
    &:hover {
      background-color: orange;
      color: #000;
    }
  }
`;