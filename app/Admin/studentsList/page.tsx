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
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { studentDetails } from "@/pages/utils/apis";
import "../../globals.css";

function StudentsList() {
  const [student, setStudent] = useState<any[]>([]);

  useEffect(() => {
    fetch(studentDetails)
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleNotificationSend = () => {
    // alert("Notification Send Successfully ")
    handlePopupClose();
  };

  return (
    <>
     <Dialog open={isPopupOpen} onClose={handlePopupClose}>
        <DialogTitle>Send Notification</DialogTitle>
        <DialogContent>
          <TextField
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleNotificationSend} className="send-button">
            Send
          </Button>
        </DialogContent>
      </Dialog>
      <TableContainer className="admin-table-container">
        <h3 className="head-text">Students List</h3>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Batch</TableCell>
              <TableCell align="right">Book Name</TableCell>
              <TableCell align="right">Book Taken Date</TableCell>
              <TableCell align="right">Book Return Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student?.map((lib) => (
              <TableRow key={lib.id}>
                <TableCell component="th" scope="row" align="right">
                  {lib.name}
                </TableCell>
                <TableCell align="right">{lib.department}</TableCell>
                <TableCell align="right">{lib.batch}</TableCell>
                <TableCell align="right">{lib.book_name}</TableCell>
                <TableCell align="right">{lib.book_taken_date}</TableCell>
                <TableCell align="right">
                  {lib.book_return_date ? lib.book_return_date : "-"}
                </TableCell>
                <TableCell align="right">{lib.status}</TableCell>
                <TableCell align="right"><Button className="send-button" onClick={handlePopupOpen}>Send Notification</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StudentsList;
