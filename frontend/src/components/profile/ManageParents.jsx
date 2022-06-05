import { Card, Typography } from "@mui/material";
import { Component } from "react";
import Title from "../Title";
import FamiltyListItem from "./FamiltyListItem";
import { Box } from "@mui/material";
import { ListItem } from "@mui/material";
import { List } from "@mui/material";
import EditHeader from "../EditHeader";
import AddFamilyListItem from "./AddFamilyListItem";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import {
  PARENT_REQUESTS,
  PARENT_REQUESTED,
  PARENT_CONFIRMED,
} from "../../constants";

class ManageParents extends Component {
  state = {
    add_parent: [
      { id: 5, name: "Shubham" },
      { id: 6, name: "Vivek" },
      { id: 7, name: "Roshni" },
      { id: 8, name: "Noriya" },
      { id: 9, name: "Khusbu" },
    ],
    addMode: false,
    PARENT_REQUESTS: false,
    PARENT_REQUESTED: false,
    PARENT_CONFIRMED: false,
  };

  addMode = (bool) => {
    this.setState({ addMode: bool });
  };

  itemSelected = (event, value) => {
    console.log("ManageParents", "selected", value);
  };

  handleCollapse = (enent, value) => {
    if (value == PARENT_REQUESTS) {
      this.setState({ PARENT_REQUESTS: !this.state.PARENT_REQUESTS });
    }
    if (value == PARENT_REQUESTED) {
      this.setState({ PARENT_REQUESTED: !this.state.PARENT_REQUESTED });
    }
    if (value == PARENT_CONFIRMED) {
      this.setState({ PARENT_CONFIRMED: !this.state.PARENT_CONFIRMED });
    }
    console.log("ManageParents", "hangle_collapse", value);
  };

  render() {
    return (
      <Box>
        <Title color="none" style={{ fontWeight: "bold" }} ml={1} variant="h6">
          Manage Parents
        </Title>
        {/* Requests List */}
        <Card>
          <ListItemButton
            divider={true}
            onClick={(event, value) =>
              this.handleCollapse(event, PARENT_REQUESTS)
            }
          >
            <ListItemText primary="Requests" />
            {this.state.PARENT_REQUESTS ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Card>
        <Collapse in={this.state.PARENT_REQUESTS} timeout="auto" unmountOnExit>
          <AddFamilyListItem
            text="+ Add Parent"
            search_label="Search Parent"
            addMode={this.state.addMode}
            items={this.state.add_children}
            onDoneClicked={this.addMode}
            itemSelected={this.itemSelected}
          />
          {this.props.parents.requests.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                remove={this.props.removeChildren}
                type={PARENT_REQUESTS}
              />
            </List>
          ))}
        </Collapse>

        {/* Requested List */}
        <Card>
          <ListItemButton
            divider={true}
            onClick={(event, value) =>
              this.handleCollapse(event, PARENT_REQUESTED)
            }
          >
            <ListItemText primary="Requested" />
            {this.state.PARENT_REQUESTED ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Card>
        <Collapse in={this.state.PARENT_REQUESTED} timeout="auto" unmountOnExit>
          {this.props.parents.requested.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                remove={this.props.removeChildren}
                type={PARENT_REQUESTED}
              />
            </List>
          ))}
        </Collapse>

        {/* Confirmed List */}
        <Card>
          <ListItemButton
            divider={true}
            onClick={(event, value) =>
              this.handleCollapse(event, PARENT_CONFIRMED)
            }
          >
            <ListItemText primary="Confirmed" />
            {this.state.PARENT_CONFIRMED ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Card>
        <Collapse in={this.state.PARENT_CONFIRMED} timeout="auto" unmountOnExit>
          {this.props.parents.confirmed.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                remove={this.props.removeChildren}
                type={PARENT_CONFIRMED}
              />
            </List>
          ))}
        </Collapse>
      </Box>
    );
  }
}

export default ManageParents;
