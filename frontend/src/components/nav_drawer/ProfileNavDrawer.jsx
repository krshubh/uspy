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
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorder from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

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
        <NavHeader />
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
                {item.open ? <ExpandMore /> : <ChevronRightIcon />}
              </ListItemButton>
              <Collapse in={item.open} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ display: "block" }}>
                  {item.sub_items.map((sub_item) => (
                    <ListItemButton
                      key={sub_item.sub_id}
                      onClick={() => this.props.onItemClick(sub_item)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: this.props.open ? 1 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton>
                          <SvgIcon
                            color={sub_item.selected ? "primary" : "disabled"}
                          >
                            <path d={sub_item.icon} />
                          </SvgIcon>
                        </IconButton>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            color={sub_item.selected ? "primary" : "disabled"}
                          >
                            {sub_item.value}
                          </Typography>
                        }
                        sx={{ opacity: this.props.open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
              <Divider />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default ProfileNavDrawer;
