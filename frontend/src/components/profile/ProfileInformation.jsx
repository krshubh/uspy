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
          title="Profile Information"
          edit_mode={this.state.edit_mode}
          clicked_editmode={this.clicked_editmode}
        />
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email_address"
              name="Email Address"
              label="Email Address"
              fullWidth
              autoComplete="Email address"
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="mobile"
              name="Mobile No"
              label="Mobile No"
              fullWidth
              autoComplete="Mobile no"
              variant="standard"
              disabled={this.state.edit_mode ? false : true}
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel id="demo-radio-buttons-group-label" color="secondary">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                disabled={this.state.edit_mode ? false : true}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                disabled={this.state.edit_mode ? false : true}
              />
            </RadioGroup>
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

export default ProfileInformation;
