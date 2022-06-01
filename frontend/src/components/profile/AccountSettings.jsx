import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import NavHeader from "../NavHeader";
import ManageChildren from "./ManageChildren";
import ManageParents from "./ManageParents";

class AccountSettings extends Component {
  state = {
    families: {
      parents: {
        requests: [
          { id: 1, name: "Request name" },
          { id: 2, name: "Silpa" },
          { id: 3, name: "Divya" },
          { id: 4, name: "Priya" },
        ],
        requested: [
          { id: 1, name: "Requested name" },
          { id: 2, name: "Silpa" },
          { id: 3, name: "Divya" },
          { id: 4, name: "Priya" },
        ],
        confirmed: [
          { id: 1, name: "confirmed name" },
          { id: 2, name: "Silpa" },
          { id: 3, name: "Divya" },
          { id: 4, name: "Priya" },
        ],
      },
      children: {
        requests: [
          { id: 1, name: "Request child name" },
          { id: 2, name: "Silpa" },
          { id: 3, name: "Divya" },
          { id: 4, name: "Priya" },
        ],
        requested: [
          { id: 1, name: "Requested child name" },
          { id: 2, name: "Silpa" },
          { id: 3, name: "Divya" },
          { id: 4, name: "Priya" },
        ],
        confirmed: [
          { id: 1, name: "confirmed child name" },
          { id: 2, name: "Silpa" },
          { id: 3, name: "Divya" },
          { id: 4, name: "Priya" },
        ],
      },
    },
  };

  removeParent = (item) => {
    const parents = [];
    this.state.families.parents.forEach((parent) => {
      if (parent.id != item.id) {
        parents.push(parent);
      }
    });
    this.state.families.parents = parents;
    this.setState({ families: this.state.families });
  };

  removeChildren = (item) => {
    const children = [];
    this.state.families.children.forEach((child) => {
      if (child.id != item.id) {
        children.push(child);
      }
    });
    this.state.families.children = children;
    this.setState({ families: this.state.families });
  };

  render() {
    return (
      <Box sx={{ width: "100%" }}>
        <NavHeader />
        <TabContext value={this.props.selected_tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={this.props.handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Parents" value="1" />
              <Tab label="Childrens" value="2" />
            </TabList>
          </Box>
          <Card variant="outlined" sx={{ margin: 2 }}>
            <TabPanel value="1">
              <ManageParents
                parents={this.state.families.parents}
                removeParent={this.removeParent}
              />
            </TabPanel>
            <TabPanel value="2">
              <ManageChildren
                children={this.state.families.children}
                removeChildren={this.removeChildren}
              />
            </TabPanel>
          </Card>
        </TabContext>
      </Box>
    );
  }
}

export default AccountSettings;
