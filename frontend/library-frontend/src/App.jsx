import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import { ChakraProvider } from '@chakra-ui/react';
import { BookForm } from './components/BookForm';
import { SearchBar } from './components/SearchBar';
import { BookList } from './components/BookList';

function App() {
  const[books, setBooks] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetchBook()
  }, []);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/books`);
      setBooks(res.data);
      setFilter(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
    setFilter([...filter, newBook])
  }

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    setFilter(updatedBooks);
  };

  const handleSearch = (searchTerm) => {
    const filtered = books.filter((book) => {
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    });
    setFilter(filtered)
  }


  return (
    <ChakraProvider>
      <div className='app'>
        <h1>BookVault</h1>
      <div className='header'>
          <SearchBar  onSearch={handleSearch}/>
          <BookForm onAddBook={handleAddBook} />
          </div>
          <BookList books={filter} onDeleteBook={handleDeleteBook} />
      </div>
    </ChakraProvider>
  )
}

export default App
