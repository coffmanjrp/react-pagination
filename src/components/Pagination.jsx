import React, { useEffect, useState } from 'react';

const Pagination = () => {
  const [lists, setLists] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const handleClick = (e) => {
    setCurrentPage(+e.target.id);
  };

  const pages = [];

  for (let i = 1; i <= Math.floor(lists.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  const currentItems = lists.slice(indexOfFistItem, indexOfLastItem);

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
        const data = await res.json();

        setLists(data);
      })();
    } catch (error) {
      throw new Error(error);
    }
    // eslint-disable-next-line
  }, []);

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

  let pageIncrementButton = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementButton = <li onClick={handleNextButton}> &hellip; </li>;
  }

  let pageDecrementButton = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementButton = <li onClick={handlePrevButton}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 5);
  };

  return (
    <>
      <h1 className="header-title">React Pagination</h1>
      <ul>
        {currentItems.map((item, index) => (
          <li key={item.id}>
            {item.id}. {item.title}
          </li>
        ))}
      </ul>
      <ul className="page-numbers">
        {currentPage !== 1 && (
          <li>
            <button className="btn" onClick={handlePrevButton}>
              Prev
            </button>
          </li>
        )}
        {pageDecrementButton}
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
        {pageIncrementButton}
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
