import * as React from "react";
import { Component, useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Title from "../Title";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import EditHeader from "../EditHeader";

class ProfileInformation extends Component {
  clicked_editmode = () => {
    this.setState({ edit_mode: true });
  };

  componentDidMount = () => {
    console.log("ProfileInformation", this.props.profile);
  };

  render() {
    return (
      <React.Fragment>
        <EditHeader
          title="Profile Information"
          edit_mode={this.props.edit_mode}
          clicked_editmode={() => this.props.onEditClicked("profile")}
        />
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              value={
                this.props.profile.user ? this.props.profile.user.firstname : ""
              }
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(e) => {
                this.props.updateProfile({
                  user: { firstname: e.target.value },
                });
              }}
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              value={
                this.props.profile.user ? this.props.profile.user.lastname : ""
              }
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => {
                this.props.updateProfile({
                  user: { lastname: e.target.value },
                });
              }}
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email_address"
              name="Email Address"
              label="Email"
              value={
                this.props.profile.user ? this.props.profile.user.email : ""
              }
              fullWidth
              autoComplete="Email address"
              variant="standard"
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mobile"
              name="Mobile No"
              label="Mobile"
              value={this.props.profile.mobile ? this.props.profile.mobile : ""}
              fullWidth
              autoComplete="Mobile no"
              variant="standard"
              onChange={(e) => {
                this.props.updateProfile({
                  mobile: e.target.value,
                });
              }}
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel id="demo-radio-buttons-group-label" color="secondary">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={
                this.props.profile.gender ? this.props.profile.gender : "M"
              }
              onChange={(e) => {
                this.props.updateProfile({
                  gender: e.target.value,
                });
              }}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="F"
                control={<Radio />}
                label="Female"
                disabled={this.props.edit_mode ? false : true}
              />
              <FormControlLabel
                value="M"
                control={<Radio />}
                label="Male"
                disabled={this.props.edit_mode ? false : true}
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} display={this.props.edit_mode ? "block" : "none"}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => this.props.onSaveClicked("cancel", {})}
              sx={{ mr: 3 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                "&:hover": {
                  backgroundColor: "#1565c0",
                  color: "#bbdefb",
                },
              }}
              onClick={() => this.props.onSaveClicked("profile", {})}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ProfileInformation;
