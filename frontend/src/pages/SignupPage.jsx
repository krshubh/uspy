import React, { Component, useContext, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HOME_URL, PRIVACY_POLICY_URL } from "../constants";
import { Container } from "@mui/material";
import DefaultNavBar from "../components/navbar/DefaultNavBar";

const SignupPage = (props) => {
  let { signUpUser, user } = useContext(AuthContext);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsPrivacy, setTermsPrivacy] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logined then navigate to home page
    if (user) {
      console.log("redirect to home page");
      navigate(HOME_URL);
    }
  });

  function validateForm() {
    // console.log("terms and privacy" + termsPrivacy.value);
    return email.length > 0 && password.length > 0 && termsPrivacy;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Box
          maxWidth="md"
          sx={{
            pt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DefaultNavBar title="Uspy" />
          <Box
            sx={{
              mt: 0,
              p: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            component={Paper}
            elevation={6}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={signUpUser}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="first-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="last-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        value={termsPrivacy ? true : false}
                        onChange={() => setTermsPrivacy(!termsPrivacy)}
                      />
                    }
                    label={
                      <p>
                        I agree the{" "}
                        <a href={PRIVACY_POLICY_URL} style={{ color: "gray" }}>
                          Uspy Terms of Service
                        </a>{" "}
                        and have read the{" "}
                        <a href={PRIVACY_POLICY_URL} style={{ color: "gray" }}>
                          Uspy Privacy Policy.
                        </a>
                      </p>
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!validateForm()}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupPage;
