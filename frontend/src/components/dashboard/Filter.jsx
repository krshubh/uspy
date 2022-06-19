import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

class Filter extends Component {
  state = {
    children: [
      {
        id: 1,
        firstname: "Rajat",
        lastname: "Verma",
      },
      {
        id: 2,
        firstname: "Manish",
        lastname: "Kumar",
      },
      {
        id: 3,
        firstname: "Himanshu",
        lastname: "Kumar",
      },
    ],
    selected_child: "",
  };

  handleChange = (event) => {
    console.log("value", event.target.value);
    this.setState({ selected_child: event.target.value });
    this.props.selectChild(event.target.value);
  };

  componentDidMount() {}

  render() {
    return (
      <Box>
        <FormControl size="small" sx={{ m: 1, minWidth: 130 }}>
          <InputLabel id="demo-simple-select-label">Select Child</InputLabel>
          <Select
            value={
              this.props.children.length > 0 && this.state.selected_child === ""
                ? this.props.children[0]
                : this.state.selected_child
            }
            label="Select Child"
            onChange={this.handleChange}
          >
            {this.props.children.map((child) => (
              <MenuItem value={child} key={child.id}>
                {child.firstname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
}

export default Filter;
