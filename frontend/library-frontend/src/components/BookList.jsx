

import axios from 'axios';
  
  export const BookList = ({ books, onDeleteBook }) => {


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`);
            onDeleteBook(id);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h5 className="book-title">{book.title}</h5>
            {book.imageUrl && (
              <img src={book.imageUrl} alt={book.title} className="book-image" />
            )}
            <h6 className="book-author">{book.author}</h6>
            <p className="book-description">{book.description}</p>
            <button
              onClick={() => handleDelete(book.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )
  }
  