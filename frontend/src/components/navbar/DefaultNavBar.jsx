import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

class DefaultNavBar extends Component {
  state = { menuAnchor: null };

  handleMenuAnchor = (event) => {
    this.state.menuAnchor = event ? event.currentTarget : null;
    this.setState({ menuAnchor: this.state.menuAnchor });
  };

  NavBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: this.props.drawerWidth,
      width: `calc(100% - ${this.props.drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  handleMenuItemClicked = (menu) => {
    this.props.onMenuItemClick(menu);
    this.handleMenuAnchor(null);
  };

  componentDidMount() {
    // console.log("user", this.props.user);
  }

  render() {
    return (
      <this.NavBar position="fixed" open={this.props.open}>
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              onClick={() => {
                this.props.navigation(-1);
              }}
              sx={{
                marginRight: 2,
                display: this.props.is_nav_icon ? "visible" : "none",
              }}
            >
              <SvgIcon htmlColor="#e3f2fd">
                {
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                }
              </SvgIcon>
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              {this.props.title}
            </Typography>
            {/* If it's either contact-us or privacy policy page, don't show menu */}
            <Box sx={{ flexGrow: 1 }}></Box>
          </Toolbar>
        </Container>
      </this.NavBar>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();

  return <DefaultNavBar {...props} navigation={navigation} />;
}
