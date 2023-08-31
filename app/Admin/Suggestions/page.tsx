'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getSuggestions } from "@/pages/utils/apis";

const Suggestions = () => {
  const [feedbackData, setFeedbackData] =useState<any[]>([]);

  useEffect(() => {
    fetch(getSuggestions)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data);
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, []);

  return (
    <TableContainer className="admin-table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Department</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Suggestions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbackData.length > 0 ? (
            feedbackData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.username}</TableCell>
                <TableCell align="center">{data.email}</TableCell>
                <TableCell align="center">{data.department}</TableCell>
                <TableCell align="center">{data.phone}</TableCell>
                <TableCell align="center">{data.suggestion}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No feedback data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Suggestions;
