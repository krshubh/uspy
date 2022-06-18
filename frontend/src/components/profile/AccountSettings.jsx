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
import {
  GET_PARENTS,
  ADD_PARENTS_REQUEST,
  REMOVE_REQUESTED_PARENT,
  REMOVE_PARENT_REQUEST,
  REMOVE_CONFIRMED_PARENT,
  ACCEPT_PARENT_REQUEST,
  GET_CHILDREN,
  ADD_CHILDREN_REQUEST,
  REMOVE_REQUESTED_CHILDREN,
  REMOVE_CHILDREN_REQUEST,
  REMOVE_CONFIRMED_CHILDREN,
  ACCEPT_CHILDREN_REQUEST,
} from "../../constants";
import { callAPI } from "../../callApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

class AccountSettings extends Component {
  state = {
    parents: {
      requests: [],
      requested: [],
      confirmed: [],
    },
    children: {
      requests: [],
      requested: [],
      confirmed: [],
    },
  };

  // For Parents
  removeRequestedParent = (item) => {
    console.log("removeRequestedParent", item);
    callAPI({
      url: REMOVE_REQUESTED_PARENT,
      access_token: this.props.authTokens.access,
      method: "DELETE",
      body: item,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ parents: json }, () => {
            console.log("parents", this.state.parents);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  removeParentRequest = (item) => {
    console.log("removeParentRequest", item);
    callAPI({
      url: REMOVE_PARENT_REQUEST,
      access_token: this.props.authTokens.access,
      method: "DELETE",
      body: item,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ parents: json }, () => {
            console.log("parents", this.state.parents);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  removeConfirmedParent = (item) => {
    console.log("removeConfirmedParent", item);
    callAPI({
      url: REMOVE_CONFIRMED_PARENT,
      access_token: this.props.authTokens.access,
      method: "DELETE",
      body: item,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ parents: json }, () => {
            console.log("parents", this.state.parents);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  addParentRequest = (parents) => {
    callAPI({
      url: ADD_PARENTS_REQUEST,
      access_token: this.props.authTokens.access,
      method: "POST",
      body: parents,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ parents: json }, () => {
            console.log("parents", this.state.parents);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  acceptParentRequest = (item) => {
    callAPI({
      url: ACCEPT_PARENT_REQUEST,
      access_token: this.props.authTokens.access,
      method: "POST",
      body: item,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ parents: json }, () => {
            console.log("parents", this.state.parents);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  // For Children
  removeRequestedChildren = (item) => {
    console.log("removeRequestedChildren", item);
    callAPI({
      url: REMOVE_REQUESTED_CHILDREN,
      access_token: this.props.authTokens.access,
      method: "DELETE",
      body: item,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ children: json }, () => {
            console.log("children", this.state.children);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  removeChildrenRequest = (item) => {
    console.log("removeChildrenRequest", item);
    callAPI({
      url: REMOVE_CHILDREN_REQUEST,
      access_token: this.props.authTokens.access,
      method: "DELETE",
      body: item,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ children: json }, () => {
            console.log("children", this.state.children);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  removeConfirmedChildren = (item) => {
    console.log("removeConfirmedParent", item);
    callAPI({
      url: REMOVE_CONFIRMED_CHILDREN,
      access_token: this.props.authTokens.access,
      method: "DELETE",
      body: item,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ children: json }, () => {
            console.log("children", this.state.children);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  addChildrenRequest = (children) => {
    callAPI({
      url: ADD_CHILDREN_REQUEST,
      access_token: this.props.authTokens.access,
      method: "POST",
      body: children,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ children: json }, () => {
            console.log("parents", this.state.children);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  acceptChildrenRequest = (item) => {
    callAPI({
      url: ACCEPT_CHILDREN_REQUEST,
      access_token: this.props.authTokens.access,
      method: "POST",
      body: item,
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({ children: json }, () => {
            console.log("children", this.state.children);
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  componentDidMount() {
    // get parents
    callAPI({
      url: GET_PARENTS,
      access_token: this.props.authTokens.access,
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({
            parents: json,
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
    // get children
    callAPI({
      url: GET_CHILDREN,
      access_token: this.props.authTokens.access,
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
          this.setState({
            children: json,
          });
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  }

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
                parents={this.state.parents}
                removeRequestedParent={this.removeRequestedParent}
                removeParentRequest={this.removeParentRequest}
                acceptParentRequest={this.acceptParentRequest}
                removeConfirmedParent={this.removeConfirmedParent}
                addParentRequest={this.addParentRequest}
              />
            </TabPanel>
            <TabPanel value="2">
              <ManageChildren
                children={this.state.children}
                removeRequestedChildren={this.removeRequestedChildren}
                removeChildrenRequest={this.removeChildrenRequest}
                acceptChildrenRequest={this.acceptChildrenRequest}
                removeConfirmedChildren={this.removeConfirmedChildren}
                addChildrenRequest={this.addChildrenRequest}
              />
            </TabPanel>
          </Card>
        </TabContext>
      </Box>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  const { authTokens } = useContext(AuthContext);

  return (
    <AccountSettings
      {...props}
      navigation={navigation}
      authTokens={authTokens}
    />
  );
}
