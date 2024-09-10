const express = require('express');
const routes = express.Router();

let books = [];

routes.post('/', (req, res) => {
    try {
      const { title, author, description, imageUrl } = req.body;
  
      if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
      }
  

      const newBook = {
        id: books.length + 1,
        title,
        author,
        description: description || '',
        imageUrl: imageUrl || '',
      };

      books.push(newBook);
      res.status(201).json(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

routes.get('/', (req, res) => {
    const {search} = req.params;
    const filteredBook = search ? books.filter((book) => {
        book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
    }) : books;
    res.json(filteredBook);
})

routes.delete('/:id', (req, res) => {
    const {id} = req.params;
    books = books.filter((book) => book.id !== parseInt(id));
    res.status(204).send();
})

module.exports = routes;

