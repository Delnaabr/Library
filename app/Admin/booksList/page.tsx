"use client";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { bookDetails } from "@/pages/utils/apis";
import "../../globals.css";
import AddBooksPopup from "@/app/AddBooks/page";

function BookListing() {
  const [books, setBooks] = useState<any[]>([]);
  const [showAddBooksPopup, setShowAddBooksPopup] = useState(false);

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
        alert("Book Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error blocking customer:", error);
      });
  };
  return (
    <TableContainer className="admin-table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableCell align="center" colSpan={6}>
            <Button color="success" onClick={handleShowAddBooksPopup}>
              Add Books
            </Button>
          </TableCell>
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
                {!lib.blocked ? (
                  <Button
                    className="delete-btn"
                    color="error"
                    onClick={() => handleBlock(lib.id)}
                  >
                    Delete
                  </Button>
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
        />
      )}
    </TableContainer>
  );
}

export default BookListing;
