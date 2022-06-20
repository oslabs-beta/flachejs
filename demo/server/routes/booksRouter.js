const express = require('express');
const router = express.Router();
const booksController = require('../controller/booksController');

// View all books
router.get('/', booksController.view, (req, res) => {
  res.json(res.locals.allEntries);
});

// Get Books by Category
router.get('/:category', 
  booksController.getBooksByCategory,
  (req, res) => res.json(res.locals.books)
);

// Add fetched books to database (to populate db)
// USE POSTMAN: POST - http://localhost:3000/bookshelf/populatedb
router.post('/populatedb', 
  booksController.fetchBooks, 
  booksController.addFetchedBooks, 
  (req, res) => res.json({})
);

module.exports = router;