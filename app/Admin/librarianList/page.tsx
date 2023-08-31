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
import { register } from "@/pages/utils/apis";
import "../../globals.css";

function LibListing() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetch(register)
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const handleBlock = (libid: string) => {
    fetch(`${register}/${libid}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedCustomers = customers.map((customer) => {
          if (customer.id === libid) {
            return { ...customer, blocked: true };
          }
          return customer;
        });
        setCustomers(updatedCustomers);
        alert("Blocked the User");
      })
      .catch((error) => {
        console.error("Error blocking customer:", error);
      });
  };

  return (
    <TableContainer className="admin-table-container">
      <h3 className="head-text">Librarians List</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Remove User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers?.map((lib) => (
            <TableRow key={lib.id}>
              <TableCell component="th" scope="row" align="center">
                {lib.username}
              </TableCell>
              <TableCell align="center">{lib.email}</TableCell>
              <TableCell align="center">{lib.phone}</TableCell>
              <TableCell align="center">{lib.address}</TableCell>
              <TableCell align="center">{lib.gender}</TableCell>
              <TableCell align="center">
                {!lib.blocked ? (
                  <Button
                    className="delete-btn"
                    color="error"
                    onClick={() => handleBlock(lib.id)}
                  >
                    Block
                  </Button>
                ) : (
                  "Blocked"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LibListing;
