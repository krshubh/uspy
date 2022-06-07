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
import { PROFILE_API } from "../constants";
import { Typography } from "@material-ui/core";
import { callAPI } from "../callApi";

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
  };

  // async getProfile() {
  //   var bearer = "Bearer " + this.props.authTokens.access;
  //   await fetch(PROFILE_API, {
  //     method: "GET",
  //     headers: {
  //       Authorization: bearer,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (json) => {
  //         console.log("json", json);
  //         this.setState({
  //           is_profile_loaded: true,
  //           profile: json,
  //         });
  //         console.log("this.state", this.state);
  //       },
  //       (error) => {
  //         console.log("error", error.message);
  //       }
  //     );
  // }

  async componentDidMount() {
    console.log("ProfilePage", "componentDidMount");
    callAPI({
      url: PROFILE_API,
      access_token: this.props.authTokens.access,
      method: "GET",
    }).then(
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
    if (item.user != undefined && item.user != null) {
      if (item.user.firstname != undefined && item.user.firstname != null) {
        profile.user.firstname = item.user.firstname;
      }
      if (item.user.lastname != undefined && item.user.lastname != null) {
        profile.user.lastname = item.user.lastname;
      }
    }
    if (item.mobile != undefined && item.mobile != null) {
      profile.mobile = item.mobile;
    }
    if (item.gender != undefined && item.gender != null) {
      profile.gender = item.gender;
    }
    if (item.address != undefined && item.address != null) {
      if (item.address.address1 != undefined && item.address.address1 != null) {
        profile.address.address1 = item.address.address1;
      }
      if (item.address.address2 != undefined && item.address.address2 != null) {
        profile.address.address2 = item.address.address2;
      }
      if (item.address.city != undefined && item.address.city != null) {
        profile.address.city = item.address.city;
      }
      if (item.address.state != undefined && item.address.state != null) {
        profile.address.state = item.address.state;
      }
      if (item.address.pincode != undefined && item.address.pincode != null) {
        profile.address.pincode = item.address.pincode;
      }
      if (item.address.country != undefined && item.address.country != null) {
        profile.address.country = item.address.country;
      }
    }
    this.setState({ profile: profile });
  };

  // async updateProfile() {
  //   var bearer = "Bearer " + this.props.authTokens.access;
  //   await fetch(PROFILE_API, {
  //     method: "POST",
  //     headers: {
  //       Authorization: bearer,
  //       "Content-Type": "application/json",
  //       body: JSON.stringify(this.state.profile)
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (json) => {
  //         console.log("json", json);
  //         this.setState({
  //           is_profile_loaded: true,
  //           profile: json,
  //         });
  //         console.log("this.state", this.state);
  //       },
  //       (error) => {
  //         console.log("error", error.message);
  //       }
  //     );
  // }

  onSaveClicked = (section) => {
    console.log("onSaveClicked", section);
    if (section === "profile" || section === "address") {
      callAPI({
        url: PROFILE_API,
        access_token: this.props.authTokens.access,
        method: "PUT",
        body: this.state.profile,
      }).then(
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
          />
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
