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
  CHILDREN_REQUESTS,
  CHILDREN_REQUESTED,
  CHILDREN_CONFIRMED,
} from "../../constants";

class ManageChildren extends Component {
  state = {
    add_children: [
      { id: 5, name: "Shubham" },
      { id: 7, name: "Roshni" },
      { id: 8, name: "Noriya" },
    ],
    addMode: false,
    CHILDREN_REQUESTS: false,
    CHILDREN_REQUESTED: false,
    CHILDREN_CONFIRMED: false,
  };

  addMode = (bool) => {
    this.setState({ addMode: bool });
  };

  itemSelected = (event, value) => {
    console.log("ManageChildren", "selected", value);
  };

  handleCollapse = (enent, value) => {
    if (value == CHILDREN_REQUESTS) {
      this.setState({ CHILDREN_REQUESTS: !this.state.CHILDREN_REQUESTS });
    }
    if (value == CHILDREN_REQUESTED) {
      this.setState({ CHILDREN_REQUESTED: !this.state.CHILDREN_REQUESTED });
    }
    if (value == CHILDREN_CONFIRMED) {
      this.setState({ CHILDREN_CONFIRMED: !this.state.CHILDREN_CONFIRMED });
    }
    console.log("ManageChildren", "hangle_collapse", value);
  };

  render() {
    return (
      <Box>
        <Title color="none" style={{ fontWeight: "bold" }} ml={1} variant="h6">
          Manage Children
        </Title>
        {/* Requests List */}
        <Card>
          <ListItemButton
            divider={true}
            onClick={(event, value) =>
              this.handleCollapse(event, CHILDREN_REQUESTS)
            }
          >
            <ListItemText primary="Requests" />
            {this.state.CHILDREN_REQUESTS ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Card>
        <Collapse
          in={this.state.CHILDREN_REQUESTS}
          timeout="auto"
          unmountOnExit
        >
          <AddFamilyListItem
            text="+ Add Children"
            search_label="Search Child"
            addMode={this.state.addMode}
            items={this.state.add_children}
            onDoneClicked={this.addMode}
            itemSelected={this.itemSelected}
          />
          {this.props.children.requests.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                remove={this.props.removeChildren}
                type={CHILDREN_REQUESTS}
              />
            </List>
          ))}
        </Collapse>

        {/* Requested List */}
        <Card>
          <ListItemButton
            divider={true}
            onClick={(event, value) =>
              this.handleCollapse(event, CHILDREN_REQUESTED)
            }
          >
            <ListItemText primary="Requested" />
            {this.state.CHILDREN_REQUESTED ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Card>
        <Collapse
          in={this.state.CHILDREN_REQUESTED}
          timeout="auto"
          unmountOnExit
        >
          {this.props.children.requested.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                remove={this.props.removeChildren}
                type={CHILDREN_REQUESTED}
              />
            </List>
          ))}
        </Collapse>

        {/* Confirmed List */}
        <Card>
          <ListItemButton
            divider={true}
            onClick={(event, value) =>
              this.handleCollapse(event, CHILDREN_CONFIRMED)
            }
          >
            <ListItemText primary="Confirmed" />
            {this.state.CHILDREN_CONFIRMED ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Card>
        <Collapse
          in={this.state.CHILDREN_CONFIRMED}
          timeout="auto"
          unmountOnExit
        >
          {this.props.children.confirmed.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                remove={this.props.removeChildren}
                type={CHILDREN_CONFIRMED}
              />
            </List>
          ))}
        </Collapse>
      </Box>
    );
  }
}

export default ManageChildren;
