import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Title from "../Title";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import EditHeader from "../EditHeader";
import { Component } from "react";

class Address extends Component {
  state = {
    edit_mode: false,
  };

  clicked_editmode = () => {
    this.setState({ edit_mode: true });
  };

  onSaveClicked = () => {
    this.setState({ edit_mode: false });
  };

  render() {
    return (
      <React.Fragment>
        <EditHeader
          title="Address"
          edit_mode={this.state.edit_mode}
          clicked_editmode={this.clicked_editmode}
        />
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} display={this.state.edit_mode ? "block" : "none"}>
            <Button
              variant="contained"
              href="#"
              color="primary"
              sx={{
                "&:hover": {
                  backgroundColor: "#1565c0",
                  color: "#bbdefb",
                },
              }}
              onClick={this.onSaveClicked}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Address;
