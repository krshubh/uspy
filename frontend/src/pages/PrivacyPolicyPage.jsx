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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CONTACT_US_MENU,
  CONTACT_US_PAGE,
  CONTACT_US_URL,
  LOGOUT_MENU,
  PRIVACY_POLICY,
  PRIVACY_POLICY_MENU,
  PRIVACY_POLICY_PAGE,
  PRIVACY_POLICY_URL,
  PROFILE_MENU,
  PROFILE_URL,
} from "../constants";
import NavBar from "../components/NavBar";
import { COLORS } from "../colors";
import { bgcolor } from "@mui/system";
import { PRIVACY_POLICY_CONTENT } from "../content";

class PrivacyPolicyPage extends Component {
  state = {
    drawerWidth: 240,
    open: false,
    menu_items: [
      {
        id: 1,
        value: PROFILE_MENU,
      },
      { id: 3, value: CONTACT_US_MENU },
      {
        id: 2,
        value: LOGOUT_MENU,
      },
    ],
    is_nav_icon: true,
    title: PRIVACY_POLICY_PAGE,
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
      case CONTACT_US_MENU: {
        this.props.navigation(CONTACT_US_URL);
        break;
      }
    }
  };

  render() {
    return (
      <Grid
        container
        fullWidth
        sm={12}
        md={12}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
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
        <Grid
          container
          fullWidth
          sm={12}
          md={8}
          sx={{ mt: 10, display: "block" }}
        >
          <Accordion expanded="true">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Introduction}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: PRIVACY_POLICY_CONTENT.Introduction_content,
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded="true">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Information_Collected}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {PRIVACY_POLICY_CONTENT.Information_Collected_content}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Use_of_Collected_Information}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {PRIVACY_POLICY_CONTENT.Use_of_Collected_Information_content}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Cookies_and_Tracking_Technologies}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {
                  PRIVACY_POLICY_CONTENT.Cookies_and_Tracking_Technologies_content
                }
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Data_Security}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: PRIVACY_POLICY_CONTENT.Data_Security_content,
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Data_Retention}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {PRIVACY_POLICY_CONTENT.Data_Retention_content}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.User_Rights}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {PRIVACY_POLICY_CONTENT.User_Rights_content}
              </Typography>
            </AccordionDetails>
          </Accordion> */}
          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Children_Privacy}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {PRIVACY_POLICY_CONTENT.Children_Privacy_content}
              </Typography>
            </AccordionDetails>
          </Accordion> */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Third_Party_Links}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {PRIVACY_POLICY_CONTENT.Third_Party_Links_content}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Legal_Basis_for_Processing}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {PRIVACY_POLICY_CONTENT.Legal_Basis_for_Processing_content}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Updates_to_the_Privacy_Policy}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {PRIVACY_POLICY_CONTENT.Updates_to_the_Privacy_Policy_content}
              </Typography>
            </AccordionDetails>
          </Accordion> */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {PRIVACY_POLICY_CONTENT.Contact_Information}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {PRIVACY_POLICY_CONTENT.Contact_Information_content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  const defaultTheme = createTheme();
  const { logoutUser, authTokens } = useContext(AuthContext);

  return (
    <ThemeProvider theme={defaultTheme}>
      <PrivacyPolicyPage
        {...props}
        navigation={navigation}
        logoutUser={logoutUser}
        authTokens={authTokens}
      />
    </ThemeProvider>
  );
}
