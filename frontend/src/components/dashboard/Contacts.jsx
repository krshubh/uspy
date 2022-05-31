import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import Form from "react-bootstrap/Form";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/system";
import { Container, Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import InputGroup from "react-bootstrap/InputGroup";
import Filter from "./Filter";

class Contacts extends Component {
  state = {
    call_logs: [
      {
        child_id: 1,
        child_name: "priya",
        calls: [
          {
            id: 1,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            type: "incoming",
            duration: "12:23",
          },
          {
            id: 2,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            type: "outgoing",
            duration: "12:23",
          },
        ],
      },
      {
        child_id: 2,
        child_name: "divya",
        messages: [
          {
            id: 1,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            type: "outgoing",
            duration: "12:23",
          },
          {
            id: 2,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            type: "incoming",
            duration: "12:23",
          },
        ],
      },
    ],
    child_id: 0,
  };

  componentDidMount() {
    if (this.state.call_logs.calls > 0) {
      this.setState({ child_id: 1 });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Paper sx={{ width: "100%" }}>
          <Filter />
          <TableContainer sx={{ maxHeight: 520 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead
                sx={{
                  backgroundColor: "orange",
                  color: "secondary",
                }}
              >
                <TableRow
                  sx={{
                    backgroundColor: "rgba(0, 0, 96)",
                    color: "rgba(255, 0, 96)",
                  }}
                >
                  <TableCell>Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.call_logs[this.state.child_id].calls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>{call.name}</TableCell>
                    <TableCell>{call.mobile_no}</TableCell>
                    <TableCell>{call.type}</TableCell>
                    <TableCell>{call.duration}</TableCell>
                    <TableCell align="right">{call.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={10}
            color="primary"
            sx={{
              height: 80,
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

export default Contacts;
