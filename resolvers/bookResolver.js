const Book = require('../models/Book');

const bookQueries = {
  booksGetAll: async () => {
    const books = await Book.find();
    return books;
  },
  bookGetOne: async ({ id }) => {
    const book = await Book.findById(id);
    if (!book) throw new Error('Book not found');
    return book;
  }
};

const bookMutations = {
  bookCreate: async ({ input }) => {
    const bookCreated = new Book(input);
    await bookCreated.save();
    return bookCreated;
  },
  bookUpdate: async ({ id, input }) => {
    const book = await Book.findByIdAndUpdate(id, input, { new: true });
    if (!book) throw new Error('Book not found');
    return book;
  },
  bookDelete: async ({ id }) => {
    const book = await Book.findByIdAndDelete(id);
    if (!book) throw new Error('Book not found');
    return book;
  }
};

module.exports = { bookQueries, bookMutations };
