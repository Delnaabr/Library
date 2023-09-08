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
  TextField,
} from "@mui/material";
import { studentDetails } from "@/pages/utils/apis";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone"; 

const AddNewEntryDialog = ({ open, onClose, onAddEntry }: any) => {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [book_name, setBookName] = useState("");
  const [batch, setBatch] = useState("");
  const [book_taken_date, setBookTakenDate] = useState(new Date());

  const formatToIST = (date:Date) => {
    return moment(date).tz("Asia/Kolkata").format("DD-MM-YYYY");
  };

  const handleAddEntry = async () => {
    const newEntry = {
      rollNo,
      name,
      department,
      book_name,
      batch,
      book_taken_date: formatToIST(book_taken_date), // book_return_date
    };

    try {
      const response = await fetch(studentDetails, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        onAddEntry(newEntry);
        onClose();
      } else {
        console.error("Error adding entry:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Entry</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details for the new entry.
        </DialogContentText>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Roll No"
                fullWidth
                required
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Student Name"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid container spacing={2}></Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className="category-select"
                fullWidth
              >
                <InputLabel htmlFor="category-select">Department</InputLabel>
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  label="Department"
                  id="department-select"
                  fullWidth
                >
                  <MenuItem value="Travel">BBA</MenuItem>
                  <MenuItem value="Autobiography">BCA</MenuItem>
                  <MenuItem value="Novel">BCom</MenuItem>
                  <MenuItem value="Animal fables">BA</MenuItem>
                  <MenuItem value="Poem">Bsc Physics</MenuItem>
                  <MenuItem value="Short story">MCA</MenuItem>
                  <MenuItem value="Animal fables">MBA</MenuItem>
                  <MenuItem value="Poem">MCom</MenuItem>
                  <MenuItem value="Short story">MA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className="category-select"
                fullWidth
              >
                <InputLabel htmlFor="category-select">Batch</InputLabel>
                <Select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  label="batch"
                  id="batch-select"
                  fullWidth
                >
                  <MenuItem value="Travel">2023 - 2026</MenuItem>
                  <MenuItem value="Autobiography">2022 - 2025</MenuItem>
                  <MenuItem value="Novel">2021 - 2024</MenuItem>
                  <MenuItem value="Animal fables">2020 - 2023</MenuItem>
                  <MenuItem value="Poem">2019 - 2022</MenuItem>
                  <MenuItem value="Short story">2023 - 2025</MenuItem>
                  <MenuItem value="Animal fables">2022 - 2024</MenuItem>
                  <MenuItem value="Poem">2021 - 2023</MenuItem>
                  <MenuItem value="Short story">2020 - 2022</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Book Name"
                fullWidth
                required
                value={book_name}
                onChange={(e) => setBookName(e.target.value)}
              />
            </Grid>
            <Grid container spacing={2} className="m-1">
              <Grid item xs={12}>
                <DatePicker
                  selected={book_taken_date}
                  onChange={(date: any) => setBookTakenDate(date)}
                  dateFormat="dd/MM/yyyy" 
                  className="form-control"
                  showYearDropdown
                  showTimeSelect={false}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleAddEntry}
          color="primary"
          disabled={!name || !department}
        >
          Add Entry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewEntryDialog;
