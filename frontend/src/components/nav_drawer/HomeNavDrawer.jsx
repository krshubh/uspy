import * as React from "react";
import { Component } from "react";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NavHeader from "../NavHeader";
import { Typography } from "@mui/material";
import Drawer from "../Drawer";

class HomeNavDrawer extends Component {
  render() {
    return (
      <Drawer
        open={this.props.open}
        drawerWidth={this.props.drawerWidth}
        onClose={() => this.props.handleOpen(false)}
      >
        <NavHeader>
          <IconButton onClick={() => this.props.handleOpen(false)}>
            <SvgIcon viewBox="0 0 50 32">
              <path d="M49,4H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,4,49,4z"></path>
              <path d="M49,16H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,16,49,16z"></path>
              <path d="M49,28H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,28,49,28z"></path>
              <path d="M8.1,22.8c-0.3,0-0.5-0.1-0.7-0.3L0.7,15l6.7-7.8c0.4-0.4,1-0.5,1.4-0.1c0.4,0.4,0.5,1,0.1,1.4L3.3,15l5.5,6.2   c0.4,0.4,0.3,1-0.1,1.4C8.6,22.7,8.4,22.8,8.1,22.8z"></path>
            </SvgIcon>
          </IconButton>
        </NavHeader>
        <List>
          {this.props.items.map((item) => (
            <ListItem
              key={item.id}
              alignItems="center"
              disablePadding
              sx={{ display: "block" }}
              onClick={() => this.props.onItemClick(item)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: this.props.open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={item.selected}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: this.props.open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <IconButton>
                    <SvgIcon color={item.selected ? "primary" : "disabled"}>
                      <path d={item.icon} />
                    </SvgIcon>
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography color={item.selected ? "primary" : "disabled"}>
                      {item.value}
                    </Typography>
                  }
                  sx={{ opacity: this.props.open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default HomeNavDrawer;
