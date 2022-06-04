import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import NavHeader from "../NavHeader";
import { Typography } from "@mui/material";

class AdminSettings extends Component {
  state = {
    all_users: {
      users: [
        { id: 1, name: "Request name" },
        { id: 2, name: "Silpa" },
        { id: 3, name: "Divya" },
        { id: 4, name: "Priya" },
      ],
      staff: [
        { id: 1, name: "Request child name" },
        { id: 2, name: "Silpa" },
        { id: 3, name: "Divya" },
        { id: 4, name: "Priya" },
      ],
      super_users: [
        { id: 1, name: "confirmed child name" },
        { id: 2, name: "Silpa" },
        { id: 3, name: "Divya" },
        { id: 4, name: "Priya" },
      ],
    },
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
              <Tab label="Users" value="1" />
              <Tab label="Staff" value="2" />
              <Tab label="Admin" value="3" />
              <Tab label="Address" value="4" />
            </TabList>
          </Box>
          <Card variant="outlined" sx={{ margin: 2 }}>
            <TabPanel value="1">
              {/* <ManageParents
                parents={this.state.families.parents}
                removeParent={this.removeParent}
              /> */}
              <Typography>users</Typography>
            </TabPanel>
            <TabPanel value="2">
              {/* <ManageChildren
                children={this.state.families.children}
                removeChildren={this.removeChildren}
              /> */}
              <Typography>staff</Typography>
            </TabPanel>
            <TabPanel value="3">
              {/* <ManageChildren
                children={this.state.families.children}
                removeChildren={this.removeChildren}
              /> */}
              <Typography>admin</Typography>
            </TabPanel>
            <TabPanel value="4">
              {/* <ManageChildren
                children={this.state.families.children}
                removeChildren={this.removeChildren}
              /> */}
              <Typography>address</Typography>
            </TabPanel>
          </Card>
        </TabContext>
      </Box>
    );
  }
}

export default AdminSettings;
