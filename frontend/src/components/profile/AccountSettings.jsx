import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import NavHeader from "../NavHeader";

class AccountSettings extends Component {
  state = {};
  render() {
    return (
      <Box sx={{ width: "100%" }}>
        <NavHeader />
        <TabContext value={this.props.selected_tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={this.props.handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Profile" value="1" />
              <Tab label="Address" value="2" />
              <Tab label="Change Password" value="3" />
            </TabList>
          </Box>
          <Card variant="outlined" sx={{ margin: 2 }}>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Address</TabPanel>
            <TabPanel value="3">Change password</TabPanel>
          </Card>
        </TabContext>
      </Box>
    );
  }
}

export default AccountSettings;
