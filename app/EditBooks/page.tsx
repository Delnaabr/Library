import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { bookDetails } from "@/pages/utils/apis";
import { updateBook } from "./BookService";

function EditBookPopup({ open, onClose, bookData, onUpdateBook }: any) {
  const [bookName, setBookName] = useState(bookData.book_name);
  const [author, setAuthor] = useState(bookData.author);
  const [category, setCategory] = useState(bookData.category);
  const [stock, setStock] = useState(bookData.stock);

  const handleUpdate = async () => {
    const updatedBook = {
      ...bookData,
      book_name: bookName,
      author: author,
      category: category,
      stock: stock,
    };

    try {
      const updatedBookResponse = await updateBook(bookData.id, updatedBook);
      onUpdateBook(updatedBookResponse);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TextField
          label="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditBookPopup;
