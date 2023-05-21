import { Component, useContext, useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NavBar from "../components/NavBar";
import NavHeader from "../components/NavHeader";
import HomeNavDrawer from "../components/nav_drawer/HomeNavDrawer";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CallLogs from "../components/dashboard/CallLogs";
import Dashboard from "../components/dashboard/Dashboard";
import Messages from "../components/dashboard/Messages";
import { fabClasses } from "@mui/material";
import {
  CALL_LOG_API,
  MESSAGE_API,
  GET_CHILDREN,
  CALL_LOG_CHILD_API,
  MESSAGE_CHILD_API,
  PROFILE_MENU,
  LOGOUT_MENU,
  CONTACT_US_MENU,
  PROFILE_URL,
  CONTACT_US_URL,
  PRIVACY_POLICY_MENU,
  PRIVACY_POLICY_URL,
} from "../constants";
import { callAPI } from "../callApi";

class HomePage extends Component {
  state = {
    drawerWidth: 240,
    open: false,
    nav_items: [
      // {
      //   id: 1,
      //   value: "Dashboard",
      //   selected: false,
      //   icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      // },
      {
        id: 2,
        value: "Call Logs",
        selected: true,
        icon: "M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z",
      },
      {
        id: 3,
        value: "Messages",
        selected: false,
        icon: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
      },
    ],
    menu_items: [
      {
        id: 1,
        value: PROFILE_MENU,
      },
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
    is_nav_icon: true,
    title: "Home",
    selected: 2,
    call_logs: [],
    messages: [],
    call_page_count: 1,
    message_page_count: 1,
    children: [],
    selected_child: {},
    call_log_page: 1,
    message_page: 1,
  };

  selectDrawerItem = (selected_item) => {
    const nav_items = [];
    for (const item of this.state.nav_items) {
      console.log("HomePage", item);
      if (item.id == selected_item.id) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      nav_items.push(item);
    }
    this.setState({ nav_items: nav_items });
  };

  onNavItemClick = (item) => {
    this.selectDrawerItem(item);
    this.setState({ selected: item.id, title: item.value });
  };

  onMenuItemClick = (item) => {
    console.log("HomePage", "menu item clicked", item);
    switch (item.value) {
      case PROFILE_MENU: {
        this.props.navigation(PROFILE_URL);
        break;
      }
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

  handleCallPageChange = (event, value) => {
    this.setState({ call_log_page: value });
    this.callLogChildApi();
  };

  handleMessagePageChange = (event, value) => {
    this.setState({ message_page: value });
    this.messageChildApi();
  };

  handleOpen = (is_open) => {
    this.setState({
      open: is_open,
      is_nav_icon: !is_open,
    });
  };

  callLogChildApi() {
    if (this.state.selected_child.id) {
      callAPI({
        url:
          CALL_LOG_CHILD_API +
          this.state.selected_child.id +
          "/" +
          "?page=" +
          this.state.call_log_page,
        access_token: this.props.authTokens.access,
        method: "GET",
      })
        .then((res) => res.json())
        .then(
          (json) => {
            console.log("json", json);
            this.setState({
              call_logs: json.results,
              call_page_count: Math.ceil(json.count / json.page_size),
            });
          },
          (error) => {
            console.log("error", error.message);
          }
        );
    }
  }

  messageChildApi() {
    if (this.state.selected_child.id) {
      callAPI({
        url:
          MESSAGE_CHILD_API +
          this.state.selected_child.id +
          "/" +
          "?page=" +
          this.state.message_page,
        access_token: this.props.authTokens.access,
        method: "GET",
      })
        .then((res) => res.json())
        .then(
          (json) => {
            console.log("json", json);
            this.setState({
              messages: json.results,
              message_page_count: Math.ceil(json.count / json.page_size),
            });
          },
          (error) => {
            console.log("error", error.message);
          }
        );
    }
  }

  getCallMessages() {
    this.callLogChildApi();
    this.messageChildApi();
  }

  getChildren() {
    callAPI({
      url: GET_CHILDREN,
      access_token: this.props.authTokens.access,
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({
            children: json.confirmed,
            selected_child: json.confirmed.length > 0 ? json.confirmed[0] : {},
          });
          this.getCallMessages();
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  }

  componentDidMount() {
    this.setState({ selected: 2, title: "CallLogs" });
    this.getChildren();
  }

  selectChild = (child) => {
    this.state.selected_child = child;
    this.setState({ call_log_page: 1, message_page: 1, selected_child: child });
    this.getCallMessages();
  };

  render() {
    return (
      <Box sx={{ display: "flex" }}>
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
        <HomeNavDrawer
          open={this.state.open}
          items={this.state.nav_items}
          drawerWidth={this.state.drawerWidth}
          handleOpen={(is_open) => this.handleOpen(is_open)}
          onItemClick={(item) => this.onNavItemClick(item)}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <NavHeader />
          {this.state.selected == 1 && <Dashboard />}
          {this.state.selected == 2 && (
            <CallLogs
              data={this.state.call_logs}
              page_count={this.state.call_page_count}
              handlePageChange={this.handleCallPageChange}
              children={this.state.children}
              selectChild={this.selectChild}
            />
          )}
          {this.state.selected == 3 && (
            <Messages
              data={this.state.messages}
              page_count={this.state.message_page_count}
              handlePageChange={this.handleMessagePageChange}
              children={this.state.children}
              selectChild={this.selectChild}
            />
          )}
        </Box>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  const { logoutUser, authTokens } = useContext(AuthContext);

  return (
    <HomePage
      {...props}
      navigation={navigation}
      logoutUser={logoutUser}
      authTokens={authTokens}
    />
  );
}
