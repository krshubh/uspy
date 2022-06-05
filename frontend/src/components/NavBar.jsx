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
import ProfilePage from "../pages/ProfilePage";
import AuthContext from "../context/AuthContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

class NavBar extends Component {
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

  homeClicked = () => {
    this.props.navigation("/");
  };

  handleMenuItemClicked = (menu) => {
    this.props.onMenuItemClick(menu);
    this.handleMenuAnchor(null);
  };

  componentDidMount() {}

  render() {
    return (
      <this.NavBar position="fixed" open={this.props.open}>
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              onClick={() => this.props.handleOpen(true)}
              sx={{
                marginRight: 2,
                display: this.props.is_nav_icon ? "visible" : "none",
              }}
            >
              <SvgIcon htmlColor="#e3f2fd">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </SvgIcon>
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={this.homeClicked}
            >
              {this.props.title}
            </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box
              sx={{
                flexGrow: 0,
                display: "inline-flex",
                alignItems: "center",
              }}
              onMouseEnter={(event) => this.handleMenuAnchor(event)}
            >
              <Typography
                sx={{
                  ml: 1,
                }}
              >
                {this.props.user.firstname}
              </Typography>
              {Boolean(this.state.menuAnchor) ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}

              <Menu
                sx={{ mt: "40px" }}
                id="menu-appbar"
                anchorEl={this.state.menuAnchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                autoFocus={false}
                open={Boolean(this.state.menuAnchor)}
                onClose={() => this.handleMenuAnchor(null)}
              >
                {this.props.menu_items.map((menu) => (
                  <MenuItem
                    key={menu.id}
                    onClick={() => this.handleMenuItemClicked(menu)}
                  >
                    <Typography textAlign="center">{menu.value}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </this.NavBar>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  const { user } = useContext(AuthContext);

  return <NavBar {...props} navigation={navigation} user={user} />;
}
