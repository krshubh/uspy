import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import NavHeader from "../components/NavHeader";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import ProfileNavDrawer from "../components/nav_drawer/ProfileNavDrawer";
import { useNavigate } from "react-router-dom";
import AccountSettings from "../components/profile/AccountSettings";
import PersonalInformation from "../components/profile/PersonalInformation";
import AdminSettings from "../components/admin_settings/AdminSettings";
import {
  PROFILE_API,
  CHANGE_PASSWORD_API,
  PROFILE_PAGE,
  CONTACT_US_MENU,
  LOGOUT_MENU,
  PRIVACY_POLICY_MENU,
  PRIVACY_POLICY_URL,
  CONTACT_US_URL,
} from "../constants";
import { callAPI } from "../callApi";
import CustomAlert from "../components/CustomAlert";
import _ from "lodash";

class ProfilePage extends Component {
  state = {
    drawerWidth: 240,
    open: true,
    selected: 1,
    nav_items: [
      {
        id: 1,
        value: "Profile",
        icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
        open: true,
        selected: true,
        sub_items: [
          {
            id: 1,
            sub_id: 1,
            selected: true,
            value: "Personal Information",
            icon: "M20.5 4c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 6c1.86.5 4 .83 6 1v12h2v-6h2v6h2V7c2-.17 4.14-.5 6-1l-.5-2zM12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2z",
          },
          {
            id: 1,
            sub_id: 2,
            selected: false,
            value: "Address",
            icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
          },
          {
            id: 1,
            sub_id: 3,
            selected: false,
            value: "Change Password",
            icon: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
          },
        ],
      },
      {
        id: 2,
        value: "Account Settings",
        icon: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        open: true,
        selected: false,
        sub_items: [
          {
            id: 2,
            sub_id: 1,
            selected: false,
            value: "Parents",
            icon: "M11.99 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm3.61 6.34c1.07 0 1.93.86 1.93 1.93 0 1.07-.86 1.93-1.93 1.93-1.07 0-1.93-.86-1.93-1.93-.01-1.07.86-1.93 1.93-1.93zm-6-1.58c1.3 0 2.36 1.06 2.36 2.36 0 1.3-1.06 2.36-2.36 2.36s-2.36-1.06-2.36-2.36c0-1.31 1.05-2.36 2.36-2.36zm0 9.13v3.75c-2.4-.75-4.3-2.6-5.14-4.96 1.05-1.12 3.67-1.69 5.14-1.69.53 0 1.2.08 1.9.22-1.64.87-1.9 2.02-1.9 2.68zM11.99 20c-.27 0-.53-.01-.79-.04v-4.07c0-1.42 2.94-2.13 4.4-2.13 1.07 0 2.92.39 3.84 1.15-1.17 2.97-4.06 5.09-7.45 5.09z",
          },
          {
            id: 2,
            sub_id: 2,
            selected: false,
            value: "Childrens",
            icon: "M22.94 12.66c.04-.21.06-.43.06-.66s-.02-.45-.06-.66c-.25-1.51-1.36-2.74-2.81-3.17-.53-1.12-1.28-2.1-2.19-2.91C16.36 3.85 14.28 3 12 3s-4.36.85-5.94 2.26c-.92.81-1.67 1.8-2.19 2.91-1.45.43-2.56 1.65-2.81 3.17-.04.21-.06.43-.06.66s.02.45.06.66c.25 1.51 1.36 2.74 2.81 3.17.52 1.11 1.27 2.09 2.17 2.89C7.62 20.14 9.71 21 12 21s4.38-.86 5.97-2.28c.9-.8 1.65-1.79 2.17-2.89 1.44-.43 2.55-1.65 2.8-3.17zM19 14c-.1 0-.19-.02-.29-.03-.2.67-.49 1.29-.86 1.86C16.6 17.74 14.45 19 12 19s-4.6-1.26-5.85-3.17c-.37-.57-.66-1.19-.86-1.86-.1.01-.19.03-.29.03-1.1 0-2-.9-2-2s.9-2 2-2c.1 0 .19.02.29.03.2-.67.49-1.29.86-1.86C7.4 6.26 9.55 5 12 5s4.6 1.26 5.85 3.17c.37.57.66 1.19.86 1.86.1-.01.19-.03.29-.03 1.1 0 2 .9 2 2s-.9 2-2 2zM7.5 14c.76 1.77 2.49 3 4.5 3s3.74-1.23 4.5-3h-9z",
          },
        ],
      },
      // {
      //   id: 3,
      //   value: "Admin Settings",
      //   icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      //   open: true,
      //   selected: false,
      //   sub_items: [
      //     {
      //       id: 3,
      //       sub_id: 1,
      //       value: "Users",
      //       selected: false,
      //       icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      //     },
      //     {
      //       id: 3,
      //       sub_id: 2,
      //       value: "Staff",
      //       selected: false,
      //       icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      //     },
      //     {
      //       id: 3,
      //       sub_id: 3,
      //       value: "Admin",
      //       selected: false,
      //       icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      //     },
      //     {
      //       id: 3,
      //       sub_id: 4,
      //       value: "Address",
      //       selected: false,
      //       icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      //     },
      // ],
      // },
    ],
    menu_items: [
      {
        id: 3,
        value: CONTACT_US_MENU,
      },
      { id: 4, value: PRIVACY_POLICY_MENU },
      {
        id: 2,
        value: LOGOUT_MENU,
      },
    ],
    selected_tab: "1",
    is_nav_icon: true,
    title: PROFILE_PAGE,
    is_profile_loaded: false,
    is_parents_loaded: false,
    is_children_loaded: false,
    personal_information_edit_mode: {
      profile_edit_mode: false,
      address_edit_mode: false,
      change_password_edit_mode: false,
    },
    account_edit_mode: { parents_edit_mode: false, children_edit_mode: false },
    profile: {},
    alert: {
      is_visible: false,
      title: "",
      message: "",
      severity: "success",
    },
  };

  async componentDidMount() {
    console.log("ProfilePage", "componentDidMount");
    callAPI({
      url: PROFILE_API,
      access_token: this.props.authTokens.access,
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({
            is_profile_loaded: true,
            profile: json,
            body: null,
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  }

  handleChange = (event, newValue) => {
    this.setState({ selected_tab: newValue });
    const nav_items = [];
    for (const item of this.state.nav_items) {
      if (item.selected === true) {
        for (const sub_item of item.sub_items) {
          if (sub_item.sub_id === newValue) {
            sub_item.selected = true;
          } else {
            sub_item.selected = false;
          }
        }
      }
      nav_items.push(item);
    }
    this.setState({ nav_items: nav_items });
  };

  onDrawerItemClick = (selected_item) => {
    console.log("ProfilePage", "item", selected_item);
    const nav_items = [];
    for (const item of this.state.nav_items) {
      if (item.id === selected_item.id) {
        item.selected = true;
        for (const sub_item of item.sub_items) {
          if (sub_item.sub_id === selected_item.sub_id) {
            sub_item.selected = true;
          } else {
            sub_item.selected = false;
          }
        }
      } else {
        item.selected = false;
        for (const sub_item of item.sub_items) {
          sub_item.selected = false;
        }
      }
      nav_items.push(item);
    }
    this.setState({ nav_items: nav_items });
    this.setState({
      selected: selected_item.id,
      selected_tab: selected_item.sub_id + "",
    });
  };

  onMenuItemClick = (item) => {
    console.log("ProfilePage", "menu item clicked", item);
    switch (item.value) {
      case CONTACT_US_MENU: {
        this.props.navigation(CONTACT_US_URL);
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

  updateProfile = (item) => {
    console.log("updateProfile", item);
    var profile = this.state.profile;
    profile = _.merge(profile, item);
    this.setState({ profile: profile });
    console.log("profile", this.state.profile);
  };

  onSaveClicked = async (section, data) => {
    console.log("onSaveClicked", section, this.state.profile);
    if (section === "profile" || section === "address") {
      callAPI({
        url: PROFILE_API,
        access_token: this.props.authTokens.access,
        method: "PUT",
        body: this.state.profile,
      })
        .then((res) => res.json())
        .then(
          (json) => {
            console.log("json", json);
            this.setState({
              is_profile_loaded: true,
              profile: json,
              personal_information_edit_mode: {
                profile_edit_mode: false,
                address_edit_mode: false,
                change_password_edit_mode: false,
              },
            });
          },
          (error) => {
            console.log("error", error.message);
          }
        );
    } else if (section === "change_password") {
      let response = await callAPI({
        url: CHANGE_PASSWORD_API,
        access_token: this.props.authTokens.access,
        method: "POST",
        body: data,
      });
      let json = await response.json();
      console.log("data", json);
      if (response.status === 200) {
        this.setState({
          alert: {
            is_visible: true,
            title: json.message ? json.message : "Password updated",
            message: "",
            severity: "success",
          },
          personal_information_edit_mode: {
            profile_edit_mode: false,
            address_edit_mode: false,
            change_password_edit_mode: false,
          },
        });
      } else if (response.status === 400) {
        this.setState({
          alert: {
            is_visible: true,
            title: json.non_field_errors[0]
              ? json.non_field_errors[0]
              : "Some Error occured",
            message: "",
            severity: "error",
          },
          personal_information_edit_mode: {
            profile_edit_mode: false,
            address_edit_mode: false,
            change_password_edit_mode: false,
          },
        });
      } else {
        console.log("error");
      }
    } else if (section === "cancel") {
      this.setState({
        personal_information_edit_mode: {
          profile_edit_mode: false,
          address_edit_mode: false,
          change_password_edit_mode: false,
        },
      });
    }
  };

  onEditClicked = (section) => {
    console.log("onEditClicked", section);
    if (section == "profile") {
      this.setState({
        personal_information_edit_mode: {
          profile_edit_mode: true,
          address_edit_mode: false,
          change_password_edit_mode: false,
        },
      });
    }
    if (section == "address") {
      this.setState({
        personal_information_edit_mode: {
          profile_edit_mode: false,
          address_edit_mode: true,
          change_password_edit_mode: false,
        },
      });
    }
    if (section == "change_password") {
      this.setState({
        personal_information_edit_mode: {
          profile_edit_mode: false,
          address_edit_mode: false,
          change_password_edit_mode: true,
        },
      });
    }
  };

  hideAlert = (isVisible) => {
    const alert = _.merge(this.state.alert, { is_visible: false });
    this.setState({ alert: alert });
  };

  render() {
    return (
      <Box sx={{ display: "flex" }}>
        <NavBar
          is_nav_icon={this.state.is_nav_icon}
          open={false}
          title={this.state.title}
          menu_items={this.state.menu_items}
          drawerWidth={this.state.drawerWidth}
          handleOpen={(is_open) => this.handleOpen(is_open)}
          onItemClick={(item) => this.onNavItemClick(item)}
          onMenuItemClick={(item) => this.onMenuItemClick(item)}
        />
        <ProfileNavDrawer
          open={this.state.open}
          items={this.state.nav_items}
          drawerWidth={this.state.drawerWidth}
          handleOpen={(is_open) => this.handleOpen(is_open)}
          onItemClick={(item) => this.onDrawerItemClick(item)}
        />
        {/* <ProfileNavDrawer
          open={this.state.open}
          items={this.state.nav_items}
          drawerWidth={this.state.drawerWidth}
        /> */}
        {this.state.selected == 1 && (
          <PersonalInformation
            selected_tab={this.state.selected_tab}
            profile={this.state.profile}
            updateProfile={this.updateProfile}
            handleChange={this.handleChange}
            onSaveClicked={this.onSaveClicked}
            onEditClicked={this.onEditClicked}
            personal_information_edit_mode={
              this.state.personal_information_edit_mode
            }
          >
            <CustomAlert
              title={this.state.alert.title}
              is_visible={this.state.alert.is_visible}
              message={this.state.alert.message}
              severity={this.state.alert.severity}
              hideAlert={this.hideAlert}
            />
          </PersonalInformation>
        )}
        {this.state.selected == 2 && (
          <AccountSettings
            selected_tab={this.state.selected_tab}
            profile={this.state.profile}
            handleChange={this.handleChange}
          />
        )}
        {/* {this.state.selected == 3 && (
          <AdminSettings
            selected_tab={this.state.selected_tab}
            profile={this.state.profile}
            handleChange={this.handleChange}
          />
        )} */}
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  const { logoutUser, authTokens } = useContext(AuthContext);

  return (
    <ProfilePage
      {...props}
      navigation={navigation}
      logoutUser={logoutUser}
      authTokens={authTokens}
    />
  );
}
