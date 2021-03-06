import React, { useState } from "react";
import BookDisplay from "./BookDisplay.jsx";
import flacheClient from '../../../src/flache';

const store = new flacheClient({
  ttl: 60000,
  config: {
    driver: [
      flacheClient.MEMORY,
    ]
  }
});

const App = (props) => {
  const [books, setBooks] = useState(null);
  const [time, setTime] = useState(null);
  let bookList = [];
  
  async function serverReq() {
    const query = document.querySelector('#book-category').value
    let url;
    if (query === 'all') url = "/bookshelf"
    else url = '/bookshelf/' + query
    let start = performance.now()
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setTime((performance.now() - start).toFixed(2));
        bookList = data.reduce((acc, elem, i) => {
          acc.push(<BookDisplay data={elem} key={i} />);
          return acc;
        }, []);
        setBooks(bookList)
      })
      .catch((err) => console.log('bookshelf fetch error: ', err));
  }

  async function flacheReq() {
    const query = document.querySelector('#book-category').value;
    let url2;
    if (query === 'all') url2 = "/bookshelf";
    else (url2 = '/bookshelf/' + query);
    const books = await store.flacheRequest(url2)
      .then(res => {
        return res.json()
      });
    setTime(store.duration);
    displayBooks(books);
  }

  function displayBooks(data) {
    bookList = data.reduce((acc, elem, i) => {
      acc.push(<BookDisplay data={elem} key={i} />);
      return acc;
    }, []);
    setBooks(bookList)
  }

  return (
    <main>
      <div className="cacheContainer">
        <label htmlFor="book-category">Choose a book category:</label>
        <select id="book-category">
          <option value='all'>All Books</option>
          <option value='microsoft'>Microsoft</option>
          <option value='python'>Python</option>
          <option value="javascript">Javascript</option>
          <option value="ruby">Ruby</option>
          <option value="mongodb">MongoDB</option>
          <option value="sql">SQL</option>
          <option value="cache">Cache</option>
          <option value="node">Node</option>
          <option value="it">IT</option>
          <option value="express">Express</option>
          <option value="cpu">CPU</option>
          <option value="media">Media</option>
          <option value="computer">Computer</option>
          <option value="query">Query</option>
        </select>
        <div className="cacheBtnContainer">
          <button type="button" className="getBtn" onClick={serverReq}>No Flache</button>
          <button type="button" className="getBtn" onClick={flacheReq}>Cache with Flache</button>
        </div>
        {time !== null && <p className="cacheDisplay">{`Request Duration: ${time} ms`}</p>}
      </div>
      <div className="booksContainer">{books}</div>
    </main>
  );
};

export default App;