"use client";
import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import "../../app/globals.css";
import Link from "next/link";
import { register } from "@/pages/utils/apis";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    const adminUsername = "admin";
    const adminPassword = "admin";
    if (username === adminUsername && password === adminPassword) {
      alert("Admin login successful");
      localStorage.setItem("userRole", "ADMIN");
      router.push("/Admin/librarianList");
      window.location.reload()

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
            (user: any) =>
              user.username === username && user.password === password
          );
 
          if (matchingUser) {
            alert("Login successful");
            router.push("/Listing");
          } else {
            alert("Login failed. Incorrect username or password.");
          }
        })
        .catch((error) => {
          alert("Error fetching user data");
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
    </>
  );
};

export default Login;
