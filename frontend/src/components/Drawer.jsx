import * as React from "react";
import { Component } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

class Drawer extends Component {
  openedMixin = (theme) => ({
    width: this.props.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      width: this.props.drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...(open && {
        ...this.openedMixin(theme),
        "& .MuiDrawer-paper": this.openedMixin(theme),
      }),
      ...(!open && {
        ...this.closedMixin(theme),
        "& .MuiDrawer-paper": this.closedMixin(theme),
      }),
    })
  );

  render() {
    return (
      <this.Drawer
        variant="permanent"
        open={this.props.open}
        onClose={() => this.props.handleClose(false)}
      >
        {this.props.children}
      </this.Drawer>
    );
  }
}

export default Drawer;
