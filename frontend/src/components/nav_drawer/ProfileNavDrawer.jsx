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
import Drawer from "../Drawer";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorder from "@mui/icons-material/StarBorder";

class ProfileNavDrawer extends Component {
  state = {
    open: this.props.open,
    nav_items: this.props.items,
  };

  handleClick = (item) => {
    const nav_items = [];
    this.state.nav_items.forEach((nav_item) => {
      if (nav_item.id == item.id) {
        nav_item.open = !nav_item.open;
      }
      nav_items.push(nav_item);
    });
    this.setState({ nav_items: nav_items });
  };

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
          {this.state.nav_items.map((item) => (
            <ListItem
              key={item.id}
              sx={{ display: "block" }}
              disablePadding
              alignItems="center"
            >
              <ListItemButton onClick={() => this.handleClick(item)}>
                <ListItemText primary={item.value} />
                {item.open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={item.open} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ display: "block" }}>
                  {item.sub_items.map((sub_item) => (
                    <ListItemButton
                      key={sub_item.sub_id}
                      onClick={() => this.props.onItemClick(sub_item)}
                    >
                      <ListItemText primary={sub_item.value} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default ProfileNavDrawer;
