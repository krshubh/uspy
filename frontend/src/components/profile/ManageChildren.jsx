import { Card, Typography } from "@mui/material";
import { Component, useContext, useState, useEffect } from "react";
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

import { callAPI } from "../../callApi";
import { USER_SEARCH } from "../../constants";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

class ManageChildren extends Component {
  state = {
    children: [],
    addMode: false,
    CHILDREN_REQUESTS: false,
    CHILDREN_REQUESTED: false,
    CHILDREN_CONFIRMED: false,
    selected_users: [],
  };

  onDoneClicked = (bool) => {
    this.setState({ addMode: bool, selected_users: [] });
    this.props.addChildrenRequest(this.state.selected_users);
  };

  onTextChange = (value) => {
    console.log("Manage Children", "selected", value);
    callAPI({
      url: USER_SEARCH + value,
      access_token: this.props.authTokens.access,
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({
            children: json.results,
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  onSelect = (value) => {
    this.setState({ selected_users: value });
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
          <AddFamilyListItem
            text="+ Add Children"
            search_label="Search Child"
            addMode={this.state.addMode}
            items={this.state.children}
            onDoneClicked={this.onDoneClicked}
            onTextChange={this.onTextChange}
            onSelect={this.onSelect}
          />
          {this.props.children.requested.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                type={CHILDREN_REQUESTED}
                remove={this.props.removeRequestedChildren}
              />
            </List>
          ))}
        </Collapse>

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
          {this.props.children.requests.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                type={CHILDREN_REQUESTS}
                remove={this.props.removeChildrenRequest}
                accept={this.props.acceptChildrenRequest}
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
                type={CHILDREN_CONFIRMED}
                remove={this.props.removeConfirmedParent}
              />
            </List>
          ))}
        </Collapse>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  const { authTokens } = useContext(AuthContext);

  return (
    <ManageChildren
      {...props}
      navigation={navigation}
      authTokens={authTokens}
    />
  );
}
