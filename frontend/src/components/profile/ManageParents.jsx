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
  PARENT_REQUEST,
  PARENT_PENDING,
  PARENT_CONFIRMED,
} from "../../constants";
import { callAPI } from "../../callApi";
import { USER_SEARCH } from "../../constants";

class ManageParents extends Component {
  state = {
    parents: [],
    addMode: false,
    PARENT_REQUEST: false,
    PARENT_PENDING: false,
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
    if (value == PARENT_PENDING) {
      this.setState({ PARENT_PENDING: !this.state.PARENT_PENDING });
    }
    if (value == PARENT_REQUEST) {
      this.setState({ PARENT_REQUEST: !this.state.PARENT_REQUEST });
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
              this.handleCollapse(event, PARENT_REQUEST)
            }
          >
            <ListItemText primary="Requested" />
            {this.state.PARENT_REQUEST ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Card>
        <Collapse in={this.state.PARENT_REQUEST} timeout="auto" unmountOnExit>
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
                type={PARENT_REQUEST}
              />
            </List>
          ))}
        </Collapse>

        {/* Requests List */}
        <Card>
          <ListItemButton
            divider={true}
            onClick={(event, value) =>
              this.handleCollapse(event, PARENT_PENDING)
            }
          >
            <ListItemText primary="Requests" />
            {this.state.PARENT_PENDING ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Card>
        <Collapse in={this.state.PARENT_PENDING} timeout="auto" unmountOnExit>
          {this.props.parents.requests.map((item) => (
            <List key={item.id} sx={{ display: "block" }} disablePadding>
              <FamiltyListItem
                item={item}
                remove={this.props.removeParentRequest}
                accept={this.props.acceptParentRequest}
                type={PARENT_PENDING}
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
