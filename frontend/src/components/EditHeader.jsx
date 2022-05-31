import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Component } from "react";
import Title from "./Title";
import { Box } from "@mui/material";

class EditHeader extends Component {
  componentDidMount() {
    console.log("EditHeader", this.props);
  }

  render() {
    return (
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Title pl={0} pt={0} mb={10} variant="h6" color="primary">
          {this.props.title ? this.props.title : "Title"}
        </Title>
        <Title
          pl={0}
          pt={0}
          mb={10}
          variant="h7"
          color="secondary"
          display={this.props.edit_mode ? "none" : "block"}
          clicked_editmode={this.props.clicked_editmode}
        >
          Edit
        </Title>
      </Box>
    );
  }
}

export default EditHeader;
