import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import ContactForm from "../components/contact/ContactForm";
import { Link, Typography } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Paper, Button, TextField, Box, Grid, Checkbox } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import {
  CONTACT_US_API,
  CONTACT_US_PAGE,
  LOGOUT_MENU,
  PRIVACY_POLICY,
  PRIVACY_POLICY_MENU,
  PRIVACY_POLICY_URL,
  PROFILE_MENU,
  PROFILE_URL,
} from "../constants";
import NavBar from "../components/NavBar";
import { COLORS } from "../colors";
import { bgcolor } from "@mui/system";
import { callAPI } from "../callApi";
import { toast } from "react-toastify";

class ContactUsPage extends Component {
  state = {
    drawerWidth: 240,
    open: false,
    menu_items: [
      {
        id: 1,
        value: PROFILE_MENU,
      },
      { id: 4, value: PRIVACY_POLICY_MENU },
      {
        id: 2,
        value: LOGOUT_MENU,
      },
    ],
    is_nav_icon: true,
    title: CONTACT_US_PAGE,
    name: "",
    email: "",
    message: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("data", data, data.get("email"));
    callAPI({
      url: CONTACT_US_API,
      access_token: this.props.authTokens.access,
      method: "POST",
      body: {
        sender_email: data.get("email"),
        name: data.get("name"),
        message: data.get("message"),
      },
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ name: "", email: "", message: "" });
          toast("Message Successfully Sent", {
            position: toast.POSITION.TOP_RIGHT,
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  changeValue = (label) => (event) => {
    console.log("label", label, event);
    switch (label) {
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "message":
        this.setState({ message: event.target.value });
        break;
    }
  };

  onMenuItemClick = (item) => {
    console.log("ContactUsPage", "menu item clicked", item);
    switch (item.value) {
      case PROFILE_MENU: {
        this.props.navigation(PROFILE_URL);
        break;
      }
      case LOGOUT_MENU: {
        this.props.logoutUser();
        break;
      }
      case PRIVACY_POLICY_MENU: {
        this.props.navigation(PRIVACY_POLICY_URL);
        break;
      }
    }
  };

  render() {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          backgroundImage:
            "url(https://storage.googleapis.com/uspy/public/contact_us.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.9)",
          bgcolor: COLORS.defaultBackground,
        }}
      >
        <CssBaseline />
        <NavBar
          is_nav_icon={this.state.is_nav_icon}
          open={this.state.open}
          title={this.state.title}
          menu_items={this.state.menu_items}
          drawerWidth={this.state.drawerWidth}
          handleOpen={(is_open) => this.handleOpen(is_open)}
          onItemClick={(item) => this.onNavItemClick(item)}
          onMenuItemClick={(item) => this.onMenuItemClick(item)}
        />
        <Grid container component="main">
          <Grid
            container
            fullWidth
            sm={12}
            md={12}
            sx={{
              flex: 1,
              display: "block",
            }}
          >
            <Box>
              <Box
                container
                xs={false}
                sm={12}
                md={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 15,
                }}
              >
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{
                    color: "white",
                  }}
                >
                  Get in touch
                </Typography>
              </Box>
              <Box
                fullWidth
                xs={false}
                sm={12}
                md={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="h3"
                  variant="body1"
                  sx={{
                    color: "white",
                  }}
                >
                  Want to get in touch? We'd love to hear from you. Here is how
                  you can reach us...
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={false}
              sm={0}
              md={6}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                {/* Address Box */}
                <Box sx={{ p: 2 }}>
                  <Grid
                    xs={false}
                    sm={12}
                    md={12}
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton style={{ border: "2px solid white" }}>
                      <SvgIcon htmlColor="#e3f2fd">
                        <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
                      </SvgIcon>
                    </IconButton>
                    <Grid xs={false} sm={10} md={10} sx={{ pl: 2 }}>
                      <Typography
                        component="h3"
                        variant="h6"
                        sx={{ color: COLORS.accentColor }}
                      >
                        Address
                      </Typography>
                      <Typography
                        component="h3"
                        variant="body1"
                        sx={{ color: COLORS.white }}
                      >
                        B-Narayanapura, Mahadevpura, Bengalore, Karnataka, Pin -
                        560016
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                {/* Phone Box */}
                <Box sx={{ p: 2 }}>
                  <Grid
                    xs={false}
                    sm={12}
                    md={12}
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton style={{ border: "2px solid white" }}>
                      <SvgIcon htmlColor="#e3f2fd">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />{" "}
                      </SvgIcon>
                    </IconButton>
                    <Grid xs={false} sm={10} md={10} sx={{ pl: 2 }}>
                      <Typography
                        component="h3"
                        variant="h6"
                        sx={{ color: COLORS.accentColor }}
                      >
                        Phone
                      </Typography>
                      <Typography
                        component="h3"
                        variant="body1"
                        sx={{ color: COLORS.white }}
                      >
                        +917543021269
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                {/* Email Box */}
                <Box sx={{ p: 2 }}>
                  <Grid
                    xs={false}
                    sm={12}
                    md={12}
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton style={{ border: "2px solid white" }}>
                      <SvgIcon htmlColor="#e3f2fd">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                      </SvgIcon>
                    </IconButton>
                    <Grid xs={false} sm={10} md={10} sx={{ pl: 2 }}>
                      <Typography
                        component="h3"
                        variant="h6"
                        sx={{ color: COLORS.accentColor }}
                      >
                        Email
                      </Typography>
                      <Typography
                        component="h3"
                        variant="body1"
                        sx={{ color: COLORS.white }}
                      >
                        support@uspy.in
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={false}
              sm={12}
              md={6}
              elevation={1}
              square
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                required
                sx={{
                  my: 4,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pt: 5,
                  mb: 5,
                  pl: 5,
                  pr: 5,
                  mr: 15,
                  pb: 5,
                }}
                component={Paper}
              >
                <Typography component="h1" variant="h5">
                  Send Message
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={this.handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={this.state.name}
                    onChange={this.changeValue("name")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.changeValue("email")}
                  />
                  <TextField
                    required
                    fullWidth
                    id="message"
                    minRows={3}
                    multiline={true}
                    label="Message"
                    name="message"
                    placeholder="Type your message.."
                    value={this.state.message}
                    onChange={this.changeValue("message")}
                  />
                  <Button type="send" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Send
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  const defaultTheme = createTheme();
  const { logoutUser, authTokens } = useContext(AuthContext);

  return (
    <ThemeProvider theme={defaultTheme}>
      <ContactUsPage
        {...props}
        navigation={navigation}
        logoutUser={logoutUser}
        authTokens={authTokens}
      />
    </ThemeProvider>
  );
}
