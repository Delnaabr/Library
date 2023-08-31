"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { bookDetails } from "@/pages/utils/apis";

const AddBooksPopup = ({ open, onClose, onAddBook }: any) => {
  const [book_name, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const handleAddBook = () => {
    const newBook = {
      book_name,
      author,
      stock,
      category,
    };
    fetch(bookDetails, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Books Added Successfully");
        onAddBook(newBook); 
      })
      .catch((error) => {
        alert("Error adding books");
      });
    console.log("new", newBook);
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Book</DialogTitle>
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
                <TextField
                  label="Category"
                  fullWidth
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddBook} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBooksPopup;
