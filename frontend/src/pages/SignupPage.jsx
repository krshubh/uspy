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
      navigate("/");
    }
  });

  function validateForm() {
    // console.log("terms and privacy" + termsPrivacy.value);
    return (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      termsPrivacy
    );
  }

  return (
    // <div>
    //   <div className="w-50 m-auto card mt-5">
    //     <h1 className="m-3 center-block">Sign Up</h1>
    //     <p className="mx-3 text-muted">
    //       Please fill up the form to create an account
    //     </p>
    //     <hr className="mt-1 mb-2" />
    //     <Form onSubmit={signUpUser}>
    //       <Row className="m-1">
    //         <Form.Group as={Col} controlId="firstname" className="w-50">
    //           <Form.Control
    //             type="text"
    //             autoComplete="firstname"
    //             placeholder="FirstName"
    //           />
    //         </Form.Group>
    //         <Form.Group as={Col} controlId="lastname" className="w-50">
    //           <Form.Control
    //             type="text"
    //             autoComplete="lastname"
    //             placeholder="LastName"
    //           />
    //         </Form.Group>
    //       </Row>
    //       <Form.Group controlId="username" className="m-3">
    //         <Form.Control
    //           type="text"
    //           value={username}
    //           autoComplete="username"
    //           onChange={(e) => setUserName(e.target.value)}
    //           placeholder="UserName"
    //         />
    //       </Form.Group>
    //       <Form.Group controlId="email" className="m-3">
    //         <Form.Control
    //           type="text"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           autoComplete="email"
    //           placeholder="Email"
    //         />
    //         <Form.Text className="text-muted">
    //           We'll never share your email with anyone else.
    //         </Form.Text>
    //       </Form.Group>
    //       <Form.Group controlId="password" className="m-3">
    //         <Form.Control
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           autoComplete="password"
    //           placeholder="Password"
    //         />
    //         <Form.Text id="passwordHelpBlock" muted>
    //           Your password must be 8-20 characters long, contain letters and
    //           numbers, and must not contain spaces, special characters, or
    //           emoji.
    //         </Form.Text>
    //       </Form.Group>
    //       <div className="m-3">
    //         <Form.Check
    //           type="checkbox"
    //           defaultChecked={termsPrivacy}
    //           onChange={() => setTermsPrivacy(!termsPrivacy)}
    //           label={
    //             <p>
    //               I agree the <b>Terms of Use & Privacy Policy</b>
    //             </p>
    //           }
    //         />
    //       </div>
    //       <div className="d-grid gap-2 m-3">
    //         <Button type="submit" disabled={!validateForm()}>
    //           Sign Up
    //         </Button>
    //       </div>
    //     </Form>
    //     <p className="m-3 d-flex justify-content-center">
    //       Already have an account?{" "}
    //       <a href="/login" className="text-primary ms-2">
    //         Login
    //       </a>
    //     </p>
    //   </div>
    // </div>
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(./images/login_background.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={signUpUser} sx={{ mt: 1 }}>
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
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="username"
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
                      defaultChecked={termsPrivacy}
                      onChange={() => setTermsPrivacy(!termsPrivacy)}
                    />
                  }
                  label={
                    <div>
                      I agree the <b>Terms of Use & Privacy Policy</b>
                    </div>
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
      </Grid>
    </Grid>
  );
};

export default SignupPage;
