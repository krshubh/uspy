import { Box, ListItemText, Typography } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { Component } from "react";
import { IconButton } from "@mui/material";
import { SvgIcon } from "@mui/material";
import { Card } from "@mui/material";
import { Paper } from "@mui/material";
import {
  PARENT_REQUESTS,
  PARENT_REQUESTED,
  PARENT_CONFIRMED,
  CHILDREN_REQUESTS,
  CHILDREN_REQUESTED,
  CHILDREN_CONFIRMED,
} from "../../constants";

class FamiltyListItem extends Component {
  state = {};
  render() {
    return (
      <Box
        sx={{
          backgroundColor: "text.dark",
        }}
      >
        <ListItemButton divider={true} dense={true}>
          <ListItemText>{this.props.item.firstname}</ListItemText>
          {(this.props.type == PARENT_REQUESTS ||
            this.props.type == CHILDREN_REQUESTS) && (
            <IconButton onClick={() => this.props.accept(this.props.item)}>
              <SvgIcon color="primary">
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </SvgIcon>
            </IconButton>
          )}
          <IconButton onClick={() => this.props.remove(this.props.item)}>
            <SvgIcon style={{ color: "#ff0000" }}>
              <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </SvgIcon>
          </IconButton>
        </ListItemButton>
      </Box>
    );
  }
}

export default FamiltyListItem;
