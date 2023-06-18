import { Component } from "react";
import * as React from "react";
import { LOGIN_URL, CONFIRM_RESET_PASSWORD_API } from "../constants";
import { callAPI } from "../callApi";
import { useNavigate, useLocation } from "react-router-dom";
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
    password: "",
    confirm_password: "",
    resetComplete: false,
    sent: false,
    password_matched: false,
  };

  confirm_password_changed = (e) => {
    if (this.state.password == e.target.value) {
      this.setState({ password_matching_text: "Password matched" });
      this.setState({ password_matched: true });
    } else {
      this.setState({ password_matching_text: "Password not matching" });
      this.setState({ password_matched: false });
    }
    this.setState({ confirm_password: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("password", this.state.password);
    console.log("confirm_password", this.state.confirm_password);
    console.log("url");
    const pathname = this.props.location.pathname.split("/");
    const token = pathname.at(-1);
    callAPI({
      url: CONFIRM_RESET_PASSWORD_API + token,
      method: "POST",
      body: { password: this.state.password },
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

    callAPI({
      url: CONFIRM_RESET_PASSWORD_API + token,
      method: "POST",
      body: { password: this.state.password },
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ resetComplete: true });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
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
          sm={8}
          md={8}
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
          <Grid container item direction="column" sm={8} md={12}>
            <Box sx={{ fontWeight: 500, pt: 2 }}>
              <Typography variant="h4">Enter new password</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="p" sx={{ pt: 10 }}>
                Please enter a new password.
              </Typography>
            </Box>

            <form>
              <TextField
                required
                label="New Password"
                type="password"
                autoComplete="sdf"
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  mt: 5,
                }}
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <TextField
                required
                label="Confirm new Password"
                type="password"
                autoComplete=""
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  mt: 2,
                }}
                value={this.state.confirm_password}
                onChange={this.confirm_password_changed}
              />
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={this.handleSubmit}
                  disabled={!this.state.password_matched}
                >
                  Reset Password
                </Button>
              </Box>
            </form>

            <Link
              onClick={() => {
                this.props.navigation(LOGIN_URL);
              }}
              sx={{ mt: 2, width: 200 }}
            >
              Login as a different user
            </Link>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  const location = useLocation();

  return (
    <PasswordResetPage {...props} navigation={navigation} location={location} />
  );
}
