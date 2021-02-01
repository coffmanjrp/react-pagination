import React, { useState } from 'react';

const Pagination = ({
  lists,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const pages = [];

  for (let i = 1; i <= Math.floor(lists.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (e) => {
    setCurrentPage(+e.target.id);
  };

  const handleNextButton = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % minPageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 5);
  };

  return (
    <>
      <ul className="page-numbers">
        {currentPage !== 1 && (
          <li>
            <button className="btn" onClick={handlePrevButton}>
              Prev
            </button>
          </li>
        )}
        {minPageNumberLimit >= 1 && (
          <li onClick={handlePrevButton}> &hellip; </li>
        )}
        {pages.map((number) => {
          if (number > minPageNumberLimit && number <= maxPageNumberLimit) {
            return (
              <li
                key={number}
                id={number}
                className={currentPage === number ? 'active' : ''}
                onClick={handleClick}
              >
                {number}
              </li>
            );
          }

          return false;
        })}
        {pages.length > maxPageNumberLimit && (
          <li onClick={handleNextButton}> &hellip; </li>
        )}
        {currentPage !== pages.length && (
          <li>
            <button className="btn" onClick={handleNextButton}>
              Next
            </button>
          </li>
        )}
      </ul>
      <button className="loadmore-btn btn" onClick={handleLoadMore}>
        Load More
      </button>
    </>
  );
};

export default Pagination;
