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
import { PROFILE_API, CHANGE_PASSWORD_API } from "../constants";
import { Typography } from "@material-ui/core";
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
        value: "Personal Information",
        icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
        open: true,
        selected: true,
        sub_items: [
          {
            id: 1,
            sub_id: 1,
            value: "Profile",
            icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
          },
          {
            id: 1,
            sub_id: 2,
            value: "Address",
            icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
          },
          {
            id: 1,
            sub_id: 3,
            value: "Change Password",
            icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
          },
        ],
      },
      {
        id: 2,
        value: "Account Settings",
        icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
        open: true,
        selected: false,
        sub_items: [
          {
            id: 2,
            sub_id: 1,
            value: "Parents",
            icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
          },
          {
            id: 2,
            sub_id: 2,
            value: "Childrens",
            icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
          },
        ],
      },
      {
        id: 3,
        value: "Admin Settings",
        icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
        open: true,
        selected: false,
        sub_items: [
          {
            id: 3,
            sub_id: 1,
            value: "Users",
            icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
          },
          {
            id: 3,
            sub_id: 2,
            value: "Staff",
            icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
          },
          {
            id: 3,
            sub_id: 3,
            value: "Admin",
            icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
          },
          {
            id: 3,
            sub_id: 4,
            value: "Address",
            icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
          },
        ],
      },
    ],
    menu_items: [
      {
        id: 1,
        value: "Profile",
      },
      {
        id: 2,
        value: "Logout",
      },
    ],
    selected_tab: "1",
    is_nav_icon: false,
    title: "Profile",
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
  };

  onDrawerItemClick = (sub_item) => {
    console.log("ProfilePage", "item", sub_item);
    this.setState({
      selected: sub_item.id,
      selected_tab: sub_item.sub_id + "",
    });
  };

  onMenuItemClick = (item) => {
    console.log("ProfilePage", "menu item clicked", item);
    if (item.value == "Profile") {
      this.props.navigation("/profile");
    }
    if (item.value == "Logout") {
      this.props.logoutUser();
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
      // .then((res) => res.json())
      // .then(
      //   (json) => {
      //     console.log("json", json);
      // this.setState({
      //   is_profile_loaded: true,
      //   profile: json,
      //   personal_information_edit_mode: {
      //     profile_edit_mode: false,
      //     address_edit_mode: false,
      //     change_password_edit_mode: false,
      //   },
      // });
      //   },
      //   (error) => {
      //     console.log("error", error.message);
      //   }
      // );
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
        {this.state.selected == 3 && (
          <AdminSettings
            selected_tab={this.state.selected_tab}
            profile={this.state.profile}
            handleChange={this.handleChange}
          />
        )}
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
