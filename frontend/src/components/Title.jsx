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
        gutterBottom
      >
        {this.props.children}
      </Typography>
    );
  }
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
