import React, { Component, useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Button, Checkbox, Container, FormControlLabel } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { HOME_URL, PRIVACY_POLICY_URL, RESET_PASSWORD } from "../constants";
import DefaultNavBar from "../components/navbar/DefaultNavBar";

const LoginPage = (props) => {
  let { loginUser, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [termsPrivacy, setTermsPrivacy] = useState(false);

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function validateForm() {
    console.log("validate form called");
    return email.length > 0 && password.length > 0 && termsPrivacy;
  }

  useEffect(() => {
    // If user is already logined then navigate to home page
    if (user) {
      console.log("redirect to home page");
      navigate(HOME_URL);
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            mt: 0,
            pt: 20,
            pb: 20,
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
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={loginUser}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
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
              <Button
                type="submit"
                fullWidth
                disabled={!validateForm()}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    onClick={() => {
                      navigate(RESET_PASSWORD);
                    }}
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default LoginPage;
