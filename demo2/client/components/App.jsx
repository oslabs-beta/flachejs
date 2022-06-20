import React, { Component, useState } from "react";
import BookDisplay from "./BookDisplay.jsx";


function memoizer(func) {
  let cache = new Map();

  return async function (request) {
    console.log("Cache before functionality: ", cache);
    //If not in cache, make fetch request to server and add to cache
    if (!cache.has(request)) {
      console.log('Fetching from server and adding to cache');
      let response = await func(request);
      cache.set(request, response);
    }
    //Now return data from cache
    return cache.get(request);
  };
}

async function getAllBooksTest(url) {
  let response = await fetch(url)
    .then((res) => res.json())
    .then((data) => { return data; })
    .catch((err) => console.log('bookshelf fetch error: ', err));
  return response;
}

const test = memoizer(getAllBooksTest); // returns a new function that will check Cache before executing function;

const App = (props) => {
  const [books, setBooks] = useState(null);
  const [time, setTime] = useState(null);
  let bookList = [];
  async function getAllBooks() {
    let start = performance.now()
    await fetch("/bookshelf")
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

  function displayBooks(data) {
    bookList = data.reduce((acc, elem, i) => {
      acc.push(<BookDisplay data={elem} key={i}/>);
      return acc;
    }, []);
    setBooks(bookList)
  }
  
  return (
    <main>
      <div className="cacheContainer">
        {time && <p className="cacheDisplay">{`Fetched in ${time} ms`}</p>}
        <button type="button" onClick={getAllBooks}>Get All Books</button>
        <button type="button" onClick={async () => {
          let start = performance.now()
          const allBooks = await test('/bookshelf')
          let end = performance.now()
          setTime((end - start).toFixed(2));
          console.log("Duration: ", (end - start).toFixed(2), "ms");
          displayBooks(allBooks);
        }}> Get All Books Test 2 </button>
      </div>
      <div className="booksContainer">{books}</div>
    </main>
  );
};

export default App;