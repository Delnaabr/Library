"use client";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { bookDetails } from "@/pages/utils/apis";
import "../../globals.css";
import AddBooksPopup from "@/app/AddBooks/page";
import EditBookPopup from "@/app/EditBooks/page";
import AddCardIcon from "@mui/icons-material/AddCard";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function BookListing() {
  const [books, setBooks] = useState<any[]>([]);
  const [showAddBooksPopup, setShowAddBooksPopup] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const openSnackbar = (message: any) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const openDeleteConfirmation = (libid: string) => {
    setBookToDeleteId(libid);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    if (bookToDeleteId) {
      handleBlock(bookToDeleteId);
      setDeleteConfirmationOpen(false);
    }
  };

  useEffect(() => {
    fetch(bookDetails)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const handleShowAddBooksPopup = () => {
    setShowAddBooksPopup(true);
  };

  const handleCloseAddBooksPopup = () => {
    setShowAddBooksPopup(false);
  };

  const handleAddBook = (newBook: any) => {
    setBooks([...books, newBook]);
  };

  const handleEditBook = (book: any) => {
    setEditingBook(book);
    setEditDialogOpen(true);
  };

  const handleBlock = (libid: string) => {
    fetch(`${bookDetails}/${libid}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedBooks = books.map((book) => {
          if (book.id === libid) {
            return { ...book, blocked: true };
          }
          return book;
        });
        setBooks(updatedBooks);
        openSnackbar("Book Deleted Successfully");
      })
      .catch((error) => {
        openSnackbar("Error blocking customer:");
      });
  };
  return (
    <>
      <div>
        <TableContainer className="admin-table-container">
          <h4 className="flex justify-center items-right mt-8">Book List</h4>
          <div className="flex justify-end mt-8 mr-8">
            <AddCardIcon
              onClick={handleShowAddBooksPopup}
              className="cursor-pointer hover:cursor-palm"
            />
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Book Name</TableCell>
                <TableCell align="center">Author</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Stocks</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books?.map((lib) => (
                <TableRow key={lib.id}>
                  <TableCell component="th" scope="row" align="center">
                    {lib.book_name}
                  </TableCell>
                  <TableCell align="center">{lib.author}</TableCell>
                  <TableCell align="center">{lib.category}</TableCell>
                  <TableCell align="center">{lib.stock}</TableCell>
                  <TableCell align="center">
                    {lib.stock > 0 ? (
                      "In Stock"
                    ) : (
                      <span style={{ color: "red" }}>Out of Stock </span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon
                      onClick={() => handleEditBook(lib)}
                      className="cursor-pointer hover:cursor-palm"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {!lib.blocked ? (
                      <DeleteForeverOutlinedIcon
                        onClick={() => openDeleteConfirmation(lib.id)}
                        className="cursor-pointer hover:cursor-palm"
                      />
                    ) : (
                      "Deleted"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {showAddBooksPopup && (
            <AddBooksPopup
              open={showAddBooksPopup}
              onClose={handleCloseAddBooksPopup}
              onAddBook={handleAddBook}
              books={books}
            />
          )}
          {editingBook && (
            <EditBookPopup
              open={isEditDialogOpen}
              onClose={() => {
                setEditDialogOpen(false);
                setEditingBook(null);
              }}
              bookData={editingBook}
              onUpdateBook={(updatedBook: any) => {
                const updatedBooks = books.map((book) => {
                  if (book.id === updatedBook.id) {
                    return updatedBook;
                  }
                  return book;
                });
                setBooks(updatedBooks);
                setEditDialogOpen(false);
                setEditingBook(null);
                openSnackbar("Book Updated Successfully");
              }}
            />
          )}
        </TableContainer>
      </div>
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmationOpen(false)}
            color="primary"
          >
            No
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
              Close
            </Button>
          }
        />
      </Snackbar>
    </>
  );
}

export default BookListing;
