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
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";

class Messages extends Component {
  componentDidMount() {}

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
                {this.props.data.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>{message.contact.name}</TableCell>
                    <TableCell>{message.contact.number}</TableCell>
                    <TableCell>{message.message}</TableCell>
                    <TableCell align="right">{message.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={this.props.page_count}
            color="primary"
            sx={{
              height: 80,
              display: "flex",
              justifyContent: "center",
            }}
            defaultPage={1}
            onChange={this.props.handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

export default Messages;
