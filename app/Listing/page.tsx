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
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { studentDetails, bookDetails } from "@/pages/utils/apis";
import AddNewEntryDialog from "../AddNewEntry/page";
import { connect } from "react-redux";
import { fetchStudentList } from "../redux/Action";
import { updateBookReturnDateAndStatus } from "./ListingService";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Listing = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<"students" | "books">(
    "students"
  );
  const [searchBookName, setSearchBookName] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<any>(null);
  const [editedReturnDate, setEditedReturnDate] = useState<any>("");

  const formatToIST = (date: Date) => {
    return moment(date).tz("Asia/Kolkata").format("DD-MM-YYYY");
  };

  const openReturnDialog = (item: any) => {
    setEditedItem(item);
    setEditedReturnDate(
      item.book_return_date ? formatToIST(item.book_return_date) : ""
    );
    setIsReturnDialogOpen(true);
  };
  const closeReturnDialog = () => {
    setIsReturnDialogOpen(false);
    setEditedItem(null);
    // setEditedReturnDate("");
  };

  const handleReturnDateEdit = () => {
    console.log("jjfufu");
    updateBookReturnDateAndStatus(editedItem.id, editedReturnDate)
      .then((updatedItem) => {
        console.log("jsh", updatedItem);
        const updatedStudents = students.map((student) => {
          if (student.id === editedItem.id) {
            return {
              ...student,
              book_return_date: formatToIST(editedReturnDate),
              status: "returned",
            };
          }
          return student;
        });

        setStudents(updatedStudents);
        closeReturnDialog();
      })
      .catch((error) => {
        console.error("Error updating data in the API", error);
      });
  };

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
    const data =
      selectedTab === "students"
        ? students
        : books.filter((item) =>
            selectedCategory ? item.category === selectedCategory : true
          );

    const filtered = data.filter((item) => {
      const matchesBookName =
        item.book_name?.toLowerCase().includes(searchBookName?.toLowerCase()) ||
        searchBookName === "";

      const matchesAuthor =
        item.author?.toLowerCase().includes(searchAuthor?.toLowerCase()) ||
        searchAuthor === "";

      return matchesBookName && matchesAuthor;
    });

    setFilteredData(filtered);
    setNoDataFound(filtered.length === 0);
  }, [
    students,
    books,
    searchBookName,
    searchAuthor,
    selectedTab,
    selectedCategory,
  ]);

  const handleTabChange = (tab: "students" | "books") => {
    setSelectedTab(tab);
  };

  const handleSearchKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setNoDataFound(false);
      setSearchAuthor(event.currentTarget.value);
      setSearchBookName(event.currentTarget.value);
    }
  };

  const handleAddEntry = (newEntry: any) => {
    setOpen(true);
    setStudents([...students, newEntry]);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const renderTable = () => {
    const data =
      filteredData.length > 0
        ? filteredData
        : selectedTab === "students"
        ? students
        : books;

    return (
      <>
        <Dialog open={isReturnDialogOpen} onClose={closeReturnDialog}>
          <DialogTitle>Enter Return Date</DialogTitle>
          <DialogContent>
            <DatePicker
              selected={editedReturnDate ? new Date(editedReturnDate) : null}
              onChange={(date: any) => setEditedReturnDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              showYearDropdown
              showTimeSelect={false}
            />
            <Button onClick={handleReturnDateEdit} className="send-button">
              Save
            </Button>
          </DialogContent>
        </Dialog>

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
                    colSpan={selectedTab === "students" ? 7 : 5}
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
                        <TableCell align="center">{item.rollNo}</TableCell>
                        <TableCell align="center">{item.department}</TableCell>
                        <TableCell align="center">{item.book_name}</TableCell>
                        <TableCell align="center">
                          {item.book_taken_date}
                        </TableCell>
                        <TableCell align="center">
                          {item.book_return_date ? item.book_return_date : "-"}
                        </TableCell>
                        <TableCell align="center">
                          {item.status === "returned" ? "returned" : "pending"}
                        </TableCell>
                        {item.status !== "returned" && (
                          <TableCell align="right">
                            <Button
                              className="send-button"
                              onClick={() => openReturnDialog(item)}
                            >
                              Return Book
                            </Button>
                          </TableCell>
                        )}
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
        </TableContainer>
      </>
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
        {selectedTab === "students" && (
          <Button onClick={handleAddEntry}>Add New Entry</Button>
        )}
      </div>
      {open && (
        <AddNewEntryDialog
          open={open}
          onClose={closeDialog}
          onAddEntry={handleAddEntry}
        />
      )}
      <div className="search-bar-div">
        {selectedTab === "books" && (
          <>
            <FormControl variant="outlined" className="category-select m-1">
              <InputLabel htmlFor="category-select">Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
                id="category-select"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Autobiography">Autobiography</MenuItem>
                <MenuItem value="Novel">Novel</MenuItem>
                <MenuItem value="Animal fables">Animal fables</MenuItem>
                <MenuItem value="Poem">Poem</MenuItem>
                <MenuItem value="Short story">Short story</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className="textfield-search m-1"
              label="Search by Book name"
              onKeyDown={handleSearchKeyPress}
              value={searchBookName}
              onChange={(e) => setSearchBookName(e.target.value)}
            />
            <TextField
              className="textfield-search m-1"
              label="Search by Author"
              onKeyDown={handleSearchKeyPress}
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
            />
          </>
        )}
      </div>
      {renderTable()}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    students: state.studentList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    studentList: () => dispatch(fetchStudentList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
