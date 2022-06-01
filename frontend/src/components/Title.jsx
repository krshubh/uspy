import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Component } from "react";

class Title extends Component {
  componentDidMount() {}

  render() {
    return (
      <Typography
        color={this.props.color ? this.props.color : "primary"}
        pt={this.props.pt ? this.props.pt : 0}
        pl={this.props.pl ? this.props.pl : 0}
        variant={this.props.variant ? this.props.variant : "h6"}
        display={this.props.display ? this.props.display : "block"}
        onClick={this.props.clicked_editmode}
        style={this.props.style}
        ml={this.props.ml ? this.props.ml : 0}
        mr={this.props.mr ? this.props.mr : 0}
        sx={this.props.sx}
        gutterBottom
      >
        {this.props.children}
      </Typography>
    );
  }
}

export default Title;
