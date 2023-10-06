"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import "../../app/globals.css";
import { useRouter } from "next/navigation";
import { LoginRegister } from "@/pages/utils/loginUtils";

const Register = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
  });
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const openSnackbar = (message: any) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (field: any, value: any) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const result = await LoginRegister(
      userDetails.email,
      userDetails.password,
      "register"
    );
    if (result !== null) {
      router.push("/Login");
      console.log(result, "fghjk");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className="login-div">
        <div>
          <h2>Registration</h2>
          <form onSubmit={handleRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={userDetails.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={userDetails.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  variant="outlined"
                  value={userDetails.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Phone"
                  variant="outlined"
                  value={userDetails.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  value={userDetails.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={userDetails.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="btn-class"
              disabled={
                !userDetails.address ||
                !userDetails.email ||
                !userDetails.gender ||
                !userDetails.password ||
                !userDetails.phone ||
                !userDetails.username
              }
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
      <div className="snackbar-div">
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
      </div>
    </>
  );
};

export default Register;
