import { Box, Button, ListItemText, Typography } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { Component } from "react";
import { SvgIcon } from "@mui/material";
import { Card } from "@mui/material";
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

class AddFamilyListItem extends Component {
  state = {};
  render() {
    return (
      <Box>
        {this.props.addMode ? (
          <Box
            sx={{
              display: "flex",
              width: 1,
              justifyContent: "center",
            }}
          >
            <Autocomplete
              label={
                this.props.search_label ? this.props.search_label : "Search"
              }
              sx={{ width: 1, p: 2, m: 0 }}
              options={this.props.items}
              onChange={(event, value) => this.props.itemSelected(event, value)}
              renderOption={(props, item) => (
                <Box component="li" {...props}>
                  {item.name}
                </Box>
              )}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={
                    this.props.search_label ? this.props.search_label : "Search"
                  }
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
            <Button
              color="primary"
              sx={{ align: "center" }}
              onClick={() => this.props.onDoneClicked(false)}
            >
              Done
            </Button>
          </Box>
        ) : (
          <ListItemButton
            divider={true}
            dense={true}
            onClick={() => this.props.onDoneClicked(true)}
          >
            <ListItemText align="center" style={{ color: "#0288d1" }}>
              {this.props.text ? this.props.text : " + Add new Item"}
            </ListItemText>
          </ListItemButton>
        )}
      </Box>
    );
  }
}

export default AddFamilyListItem;
