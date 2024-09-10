import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios'; // Import axios to handle HTTP requests

export const BookForm = ({ onAddBook }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Making a POST request to add the book
      const response = await axios.post('http://localhost:5000/books', book);
      onAddBook(response.data); // Updating the state with the new book data
      setBook({ title: '', author: '', description: '', imageUrl: '' }); // Reset the form fields
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" mb={4}>
        Add a New Book
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="addBookForm" onSubmit={handleSubmit}>
              <Input
                placeholder="Title"
                name="title"
                value={book.title}
                onChange={handleChange}
                mb={3}
                required
              />
              <Input
                placeholder="Author"
                name="author"
                value={book.author}
                onChange={handleChange}
                mb={3}
                required
              />
              <Textarea
                placeholder="Description"
                name="description"
                value={book.description}
                onChange={handleChange}
                mb={3}
              />
              <Input
                placeholder="Image URL"
                name="imageUrl"
                value={book.imageUrl}
                onChange={handleChange}
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" form="addBookForm">
              Add Book
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

