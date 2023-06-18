import { Component, useContext } from "react";
import * as React from "react";
import { callAPI } from "../callApi";
import { LOGIN_URL, RESET_PASSWORD_API } from "../constants";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DefaultNavBar from "../components/navbar/DefaultNavBar";
import {
  IconButton,
  Alert,
  Box,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from "../colors";
import { Button, Link } from "@mui/material";

class PasswordResetPage extends Component {
  state = {
    reset_password_body: { email: "" },
    sent: false,
    reset_password_msg: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    callAPI({
      url: RESET_PASSWORD_API,
      method: "POST",
      body: this.state.reset_password_body,
    })
      .then((res) => {
        const status_code = res.status;
        if (status_code == 200) {
          return res.json();
        } else {
          this.setState({
            reset_password_msg: "Some error occured...",
          });
          return res.error();
        }
      })
      .then((json) => {
        console.log("json", json);
        if ("message" in json) {
          this.setState({ reset_password_msg: json["message"] });
        } else {
          this.setState({
            reset_password_msg: "Some error occured",
          });
        }
        this.setState({ sent: true });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ sent: false });
  };

  action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={this.handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  render() {
    return (
      <Box
        justifyContent="center"
        sx={{
          flex: 1,
          display: "flex",
        }}
      >
        <DefaultNavBar title="Uspy" />
        <Box
          sx={{
            mt: 10,
            display: "flex",
            width: "50%",
            justifyContent: "center",
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.sent}
            autoHideDuration={6000}
            onClose={this.handleClose}
            action={this.action}
          >
            <Alert severity="success" sx={{ width: "50" }}>
              {this.state.reset_password_msg}
            </Alert>
          </Snackbar>
          <Grid container item direction="column" sm={12} md={12}>
            <Box sx={{ fontWeight: 500, pt: 2 }}>
              <Typography variant="h4">Reset your password</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="p" sx={{ pt: 10 }}>
                To receive a link to reset your password, please enter your
                email address.
              </Typography>
            </Box>

            <Box sx={{ mt: 5 }}>
              <TextField
                required
                id="outlined-required"
                label="Email"
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
                value={this.state.email}
                onChange={(e) =>
                  this.setState({
                    reset_password_body: { email: e.target.value },
                  })
                }
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" onClick={this.handleSubmit}>
                Reset Password
              </Button>
            </Box>

            <Link
              onClick={() => {
                this.props.navigation(LOGIN_URL);
              }}
              sx={{ mt: 2 }}
            >
              Go back to Login
            </Link>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();

  return <PasswordResetPage {...props} navigation={navigation} />;
}
