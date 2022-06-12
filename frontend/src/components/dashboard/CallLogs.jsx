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
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Filter from "./Filter";

class CallLogs extends Component {
  componentDidMount() {}

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
                  <TableCell>Type</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.data.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>{call.contact.name}</TableCell>
                    <TableCell>{call.contact.number}</TableCell>
                    <TableCell>{call.call_type}</TableCell>
                    <TableCell>{call.duration}</TableCell>
                    <TableCell align="right">{call.date}</TableCell>
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

export default CallLogs;
