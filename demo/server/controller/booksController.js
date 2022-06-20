const { request, json } = require('express');
const Book = require('../model/bookModel.js');
const fetch = require('node-fetch');

const booksController = {};

booksController.view = (req, res, next) => {
  Book.find({}, (err, entries) => {
    //console.log(entries)
    // entries is an Array of all the entry objects
    res.locals.allEntries = entries;
    return next();
  })
}

// Get Books From DB by Category
booksController.getBooksByCategory = (req, res, next) => {
  const category = req.params.category;
  Book.find({category: category}, (err, books) => {
    if (err) return next({
      log: 'Express Error Handler: booksController.getBooksByCategory',
      message: {err: err}
    });
    // Express error handler if no books are returned
    // if (books.length === 0) return next({
    //   log: 'Express Error Handler: booksController.getBooksByCategory',
    //   message: {err: 'No Books Found in DB'}
    // });
    res.locals.books = books;
    return next();
  })
}

// Fetch Books From API - USE POSTMAN TO ADD
booksController.fetchBooks = async (req, res, next) => {
  res.locals.books = [];
  // Add categories to search for books in API
  const categories = ['microsoft', 'python', 'javascript', 'ruby', 'mongodb', 'sql', 'cache', 'node', 'it', 'express', 'cpu', 'media', 'computer', 'query'];
  // Iterate through categories and fetch books for each category
  for (let i = 0; i < categories.length; i++) {
    const data = await fetch(`https://api.itbook.store/1.0/search/${categories[i]}`);
    const json = await data.json();
    const books = json.books;
    books.forEach(book => book.category = categories[i]);
    res.locals.books.push(...books);
  }
  return next();
}

// Add Books to Database From Fetched API
booksController.addFetchedBooks = (req, res, next) => {
  Book.insertMany(res.locals.books, (err, data) => {
    if (err) return next({
      log: 'Express Error Handler: booksController.addFetchedBooks',
      message: {err: err}
    });
  });
  return next();
}

module.exports = booksController;

