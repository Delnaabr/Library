'use client'
import React, { useEffect, useState } from "react";
import {
  Snackbar,
  SnackbarContent,
  TextField,
  Button,
  Grid,
  Container,
} from "@mui/material";
import "../../app/globals.css";
import Link from "next/link";
import { register } from "@/pages/utils/apis";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const openSnackbar = (message:any) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  const handleLogin = (e:any) => {
    e.preventDefault();
    const adminUsername = "admin";
    const adminPassword = "admin";
    if (username === adminUsername && password === adminPassword) {
      openSnackbar("Admin login successful");
      localStorage.setItem("userRole", "ADMIN");
      router.push("/Admin/librarianList");
      window.location.reload();
    } else {
      fetch(register, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const matchingUser = data.find(
            (user:any) =>
              user.username === username && user.password === password
          );

          if (matchingUser) {
            localStorage.setItem("userId", matchingUser.id);
            openSnackbar("Login successful");
            router.push("/Listing");
          } else {
            openSnackbar("Login failed. Incorrect username or password.");
          }
        })
        .catch(() => {
          openSnackbar("Error fetching user data");
        });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className="login-div">
        <div>
          <h2 className="login-text">Login here...</h2>
          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
            <div className="button-div">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="btn-class"
                disabled={!username || !password}
              >
                Login
              </Button>
            </div>
            <div className="button-div">
              <Link href="/Register">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="btn-class"
                >
                  New User
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </Container>
      <div className="snackbar-div">
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={4000} 
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
      </div>
    </>
  );
};

export default Login;
