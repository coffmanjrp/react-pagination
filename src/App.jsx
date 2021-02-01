import React, { useEffect, useState } from 'react';
import List from './components/List';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [lists, setLists] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">React Pagination</h1>
        <List
          lists={lists}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          lists={lists}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </header>
    </div>
  );
}

export default App;
