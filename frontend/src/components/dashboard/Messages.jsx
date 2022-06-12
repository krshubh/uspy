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
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

class Messages extends Component {
  state = {
    message_logs: [
      {
        child_id: 0,
        child_name: "priya",
        messages: [
          {
            id: 1,
            timestamp: "24234123",
            name: "something",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 2,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 3,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 4,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 5,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 6,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 7,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 8,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 9,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 10,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
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
            name: "new name",
            mobile_no: "8953455228",
            text: "some description",
          },
          {
            id: 2,
            timestamp: "24234123",
            name: "shubham",
            mobile_no: "8953455228",
            text: "some description",
          },
        ],
      },
    ],
    child_id: 0,
  };

  componentDidMount() {
    if (this.state.message_logs.length > 0) {
      this.setState({ child_id: 0 });
    }
  }

  handleChangePage() {}

  handleChangeRowsPerPage() {}

  SearchBar = ({ setSearchQuery }) => (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Enter a city name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );

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
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.message_logs[this.state.child_id].messages.map(
                  (message) => (
                    <TableRow key={message.id}>
                      <TableCell>{message.name}</TableCell>
                      <TableCell>{message.mobile_no}</TableCell>
                      <TableCell>{message.text}</TableCell>
                      <TableCell align="right">{message.timestamp}</TableCell>
                    </TableRow>
                  )
                )}
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

export default Messages;
