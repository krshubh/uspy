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
  render() {
    return (
      <React.Fragment>
        <EditHeader
          title="Address"
          edit_mode={this.props.edit_mode}
          clicked_editmode={() => this.props.onEditClicked("address")}
        />
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address1"
              value={
                this.props.profile.address
                  ? this.props.profile.address.address1
                  : ""
              }
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              onChange={(e) => {
                this.props.updateProfile({
                  address: { address1: e.target.value },
                });
              }}
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address2"
              value={
                this.props.profile.address
                  ? this.props.profile.address.address2
                  : ""
              }
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              onChange={(e) => {
                this.props.updateProfile({
                  address: { address2: e.target.value },
                });
              }}
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              value={
                this.props.profile.address
                  ? this.props.profile.address.city
                  : ""
              }
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={(e) => {
                this.props.updateProfile({
                  address: { city: e.target.value },
                });
              }}
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State"
              value={
                this.props.profile.address
                  ? this.props.profile.address.state
                  : ""
              }
              fullWidth
              variant="standard"
              onChange={(e) => {
                this.props.updateProfile({
                  address: { state: e.target.value },
                });
              }}
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Pincode"
              value={
                this.props.profile.address
                  ? this.props.profile.address.pincode
                  : ""
              }
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              onChange={(e) => {
                this.props.updateProfile({
                  address: { pincode: e.target.value },
                });
              }}
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              value={
                this.props.profile.address
                  ? this.props.profile.address.country
                  : ""
              }
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={(e) => {
                this.props.updateProfile({
                  address: { country: e.target.value },
                });
              }}
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} display={this.props.edit_mode ? "block" : "none"}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => this.props.onSaveClicked("cancel")}
              sx={{ mr: 3 }}
            >
              Cancel
            </Button>
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
              onClick={() => this.props.onSaveClicked("address")}
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
