import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

class Filter extends Component {
  state = {};
  render() {
    return (
      <Box className="d-flex justify-content-between">
        <Form.Select aria-label="Select Child" className="w-25 m-3">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <InputGroup className="w-25 m-3">
          <Form.Control
            type="text"
            placeholder="Search here.."
            className="rounded-pill"
          />
        </InputGroup>
      </Box>
    );
  }
}

export default Filter;
