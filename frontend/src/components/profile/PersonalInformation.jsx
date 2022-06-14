import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import NavHeader from "../NavHeader";
import ProfileInformation from "./ProfileInformation";
import Address from "./Address";
import ChangePassword from "./ChangePassword";

class PersonalInformation extends Component {
  state = {};

  componentDidMount = () => {
    console.log("PersonalInformation", this.props);
  };

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
              <Tab label="Personal Information" value="1" />
              <Tab label="Address" value="2" />
              <Tab label="Change Password" value="3" />
            </TabList>
          </Box>
          {this.props.children}
          <Card variant="outlined" sx={{ margin: 2 }}>
            <TabPanel value="1">
              <ProfileInformation
                profile={this.props.profile}
                updateProfile={this.props.updateProfile}
                onSaveClicked={this.props.onSaveClicked}
                edit_mode={
                  this.props.personal_information_edit_mode.profile_edit_mode
                }
                onEditClicked={this.props.onEditClicked}
              />
            </TabPanel>
            <TabPanel value="2">
              <Address
                profile={this.props.profile}
                updateProfile={this.props.updateProfile}
                onSaveClicked={this.props.onSaveClicked}
                edit_mode={
                  this.props.personal_information_edit_mode.address_edit_mode
                }
                onEditClicked={this.props.onEditClicked}
              />
            </TabPanel>
            <TabPanel value="3">
              <ChangePassword
                onEditClicked={this.props.onEditClicked}
                onSaveClicked={this.props.onSaveClicked}
                edit_mode={
                  this.props.personal_information_edit_mode
                    .change_password_edit_mode
                }
              />
            </TabPanel>
          </Card>
        </TabContext>
      </Box>
    );
  }
}

export default PersonalInformation;
