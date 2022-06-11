import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Component } from "react";

class CustomAlert extends Component {
  state = {};
  render() {
    return (
      <Alert
        severity={this.props.severity}
        onClose={() => this.props.hideAlert(false)}
        sx={{ display: this.props.is_visible ? "flex" : "none" }}
      >
        <AlertTitle>{this.props.title}</AlertTitle>
      </Alert>
    );
  }
}

export default CustomAlert;
