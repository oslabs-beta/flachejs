const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  category: {type: String, required: true},
  isbn13: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true }
})

module.exports = mongoose.model('books', bookSchema);