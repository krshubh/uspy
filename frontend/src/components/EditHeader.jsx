import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Component } from "react";
import Title from "./Title";
import { Box } from "@mui/material";

class EditHeader extends Component {
  componentDidMount() {}

  render() {
    return (
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Title
          color={this.props.color ? this.props.color : "primary"}
          pl={this.props.pl ? this.props.pl : 0}
          pt={this.props.pt ? this.props.pt : 0}
          mb={this.props.mb ? this.props.mb : 10}
          style={this.props.style}
          ml={1}
          variant="h6"
        >
          {this.props.title ? this.props.title : "Title"}
        </Title>
        <Title
          variant="h7"
          mr={2}
          color="secondary"
          display={this.props.edit_mode ? "none" : "block"}
          clicked_editmode={this.props.clicked_editmode}
        >
          {this.props.menu_text ? this.props.menu_text : "Edit"}
        </Title>
      </Box>
    );
  }
}

export default EditHeader;
