"use client";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { studentDetails, bookDetails } from "@/pages/utils/apis";
import { connect } from "react-redux";
import { fetchStudentList } from "../redux/Action";

const Listing = () => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<"students" | "books">(
    "students"
  );
  // const [showAddBooksPopup, setShowAddBooksPopup] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [noDataFound, setNoDataFound] = useState(false);

  useEffect(() => {
    fetch(studentDetails)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching student details", error);
      });

    fetch(bookDetails)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching book details", error);
      });
  }, []);

  useEffect(() => {
    const data = selectedTab === "students" ? students : books;

    const filtered = data.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
        item.book_name?.toLowerCase().includes(searchText?.toLowerCase()) ||
        item.author?.toLowerCase().includes(searchText?.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchText?.toLowerCase())
    );

    setFilteredData(filtered);
    setNoDataFound(filtered.length === 0);
  }, [students, books, searchText, selectedTab]);

  // const handleShowAddBooksPopup = () => {
  //   setShowAddBooksPopup(true);
  // };

  // const handleCloseAddBooksPopup = () => {
  //   setShowAddBooksPopup(false);
  // };

  // const handleAddBook = (newBook: any) => {
  //   setBooks([...books, newBook]);
  // };

  const handleTabChange = (tab: "students" | "books") => {
    setSelectedTab(tab);
  };
  const handleSearchKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setNoDataFound(false);
      setSearchText(event.currentTarget.value);
    }
  };

  const renderTable = () => {
    const data =
      filteredData.length > 0
        ? filteredData
        : selectedTab === "students"
        ? students
        : books;

    return (
      <TableContainer className="table-container">
        <Table
          style={{ maxHeight: "600px", overflowY: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {selectedTab === "students" ? (
                <>
                  <TableCell align="center">Student Name</TableCell>
                  <TableCell align="center">Roll No.</TableCell>
                  <TableCell align="center">Department</TableCell>
                </>
              ) : (
                <>
                  <TableCell align="center">Book Name</TableCell>
                  <TableCell align="center">Author</TableCell>
                </>
              )}
              {selectedTab === "students" ? (
                <>
                  <TableCell align="center">Book Name</TableCell>
                  <TableCell align="center">Book Taken Date</TableCell>
                  <TableCell align="center">Return Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                </>
              ) : (
                <>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Stock</TableCell>
                  <TableCell align="center">Status</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {noDataFound ? (
              <TableRow>
                <TableCell
                  colSpan={selectedTab === "students" ? 7 : 4}
                  align="center"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  {selectedTab === "students" ? (
                    <>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell align="center">{item.department}</TableCell>
                      <TableCell align="center">{item.book_name}</TableCell>
                      <TableCell align="center">
                        {item.book_taken_date}
                      </TableCell>
                      <TableCell align="center">
                        {item.book_return_date ? item.book_return_date : "-"}
                      </TableCell>
                      <TableCell align="center">{item.status}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="center">{item.book_name}</TableCell>
                      <TableCell align="center">{item.author}</TableCell>
                      <TableCell align="center">{item.category}</TableCell>
                      <TableCell align="center">{item.stock}</TableCell>
                      <TableCell align="center">
                        {item.stock > 0 ? (
                          "In Stock"
                        ) : (
                          <span style={{ color: "red" }}>Out of Stock </span>
                        )}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* {selectedTab === "books" && (
          <div className="add-books btn-class-listing">
            <Button className="btn-class" onClick={handleShowAddBooksPopup}>
              Add Books
            </Button>
          </div>
        )} */}
        {/* {showAddBooksPopup && (
          <AddBooksPopup
            open={showAddBooksPopup}
            onClose={handleCloseAddBooksPopup}
            onAddBook={handleAddBook}
          />
        )} */}
      </TableContainer>
    );
  };

  return (
    <div>
      <h1>Library Management</h1>
      <div className="listing-div">
        <Button
          onClick={() => handleTabChange("students")}
          className="btn-class-listing btn-class"
        >
          Students List
        </Button>
        <Button
          onClick={() => handleTabChange("books")}
          className="btn-class-listing btn-class"
        >
          Book List
        </Button>
      </div>
      <div className="search-bar-div">
        {selectedTab === "books" && (
          <Autocomplete
            className="textfield-search"
            freeSolo
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                onKeyDown={handleSearchKeyPress}
              />
            )}
            onInputChange={(event, newValue) => {
              setSearchText(newValue);
            }}
          />
        )}
      </div>

      {renderTable()}
    </div>
  );
};

// const mapStateToProps = (state: any) => {
//   return {
//     student: state,
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     studentList: () => dispatch(fetchStudentList()),
//   };
// };

export default Listing
