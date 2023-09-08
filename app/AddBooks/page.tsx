"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  SnackbarContent,
  TextField,
} from "@mui/material";
import { addBook } from "./AddBookService";

const AddBooksPopup = ({ open, onClose, onAddBook, books }: any) => {
  const [book_name, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const openSnackbar = (message: any) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAddBook = async () => {
    const newBook = {
      book_name,
      author,
      stock,
      category,
    };

    const isBookExists = books.some(
      (existingBook: any) =>
        existingBook.book_name.toLowerCase() ===
          newBook.book_name.toLowerCase() &&
        existingBook.author.toLowerCase() === newBook.author.toLowerCase()
    );

    if (isBookExists) {
      openSnackbar("Book with the same book name and author already exists.");
    } else {
      try {
        const addedBook = await addBook(newBook);
        openSnackbar("Book Added successful");
        onAddBook(addedBook);
        onClose();
      } catch (error) {
        openSnackbar("Error adding book");
      }
    }
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle className="text-green-500">Add New Book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in the details for the new book.
            </DialogContentText>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Book Name"
                    fullWidth
                    required
                    value={book_name}
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Author"
                    fullWidth
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Stock"
                    type="number"
                    fullWidth
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" className="category-select">
                    <InputLabel htmlFor="category-select">Category</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Category"
                      id="category-select"
                      fullWidth
                    >
                      <MenuItem value="Travel">Travel</MenuItem>
                      <MenuItem value="Autobiography">Autobiography</MenuItem>
                      <MenuItem value="Novel">Novel</MenuItem>
                      <MenuItem value="Animal fables">Animal fables</MenuItem>
                      <MenuItem value="Poem">Poem</MenuItem>
                      <MenuItem value="Short story">Short story</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <div className="text-red-500">
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
            </div>

            <Button
              onClick={handleAddBook}
              color="primary"
              disabled={!book_name || !author || !stock || !category}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="snackbar-div">
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <SnackbarContent
            message={snackbarMessage}
            action={
              <Button color="inherit" size="small" onClick={closeSnackbar}>
                X
              </Button>
            }
          />
        </Snackbar>
      </div>
    </>
  );
};

export default AddBooksPopup;
