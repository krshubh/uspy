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
import AuthContext from "../../context/AuthContext";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  PARENT_REQUESTS,
  PARENT_REQUESTED,
  PARENT_CONFIRMED,
} from "../../constants";
import { callAPI } from "../../callApi";
import { USER_SEARCH } from "../../constants";

class ManageParents extends Component {
  state = {
    parents: [],
    addMode: false,
    PARENT_REQUESTS: false,
    PARENT_REQUESTED: false,
    PARENT_CONFIRMED: false,
    selected_users: [],
  };

  onDoneClicked = (bool) => {
    this.setState({ addMode: bool, selected_users: [] });
    this.props.addParentRequest(this.state.selected_users);
  };

  onTextChange = (value) => {
    console.log("ManageParents", "selected", value);
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
            parents: json.results,
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
          <AddFamilyListItem
            text="+ Add Parent"
            search_label="Search Parent"
            addMode={this.state.addMode}
            items={this.state.parents}
            onDoneClicked={this.onDoneClicked}
            onTextChange={this.onTextChange}
            onSelect={this.onSelect}
          />
          {this.props.parents.requested.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                remove={this.props.removeRequestedParent}
                type={PARENT_REQUESTED}
              />
            </List>
          ))}
        </Collapse>

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
          {this.props.parents.requests.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                remove={this.props.removeParentRequest}
                accept={this.props.acceptParentRequest}
                type={PARENT_REQUESTS}
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
                remove={this.props.removeConfirmedParent}
                type={PARENT_CONFIRMED}
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
    <ManageParents {...props} navigation={navigation} authTokens={authTokens} />
  );
}
