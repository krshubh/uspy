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
  };

  handleChange = (event, newValue) => {
    this.setState({ selected_tab: newValue });
  };

  onDrawerItemClick = (sub_item) => {
    console.log("item", sub_item);
    this.setState({
      selected: sub_item.id,
      selected_tab: sub_item.sub_id + "",
    });
  };

  onMenuItemClick = (item) => {
    console.log("menu item clicked", item);
    if (item.value == "Profile") {
      this.props.navigation("/profile");
    }
    if (item.value == "Logout") {
      this.props.logoutUser();
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
            handleChange={this.handleChange}
          />
        )}
        {this.state.selected == 2 && (
          <AccountSettings
            selected_tab={this.state.selected_tab}
            handleChange={this.handleChange}
          />
        )}
        {this.state.selected == 3 && (
          <AdminSettings
            selected_tab={this.state.selected_tab}
            handleChange={this.handleChange}
          />
        )}
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  const { logoutUser, user } = useContext(AuthContext);

  return (
    <ProfilePage {...props} navigation={navigation} logoutUser={logoutUser} />
  );
}
