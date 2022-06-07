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

class ChangePassword extends Component {
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
          title="Change Password"
          edit_mode={this.props.edit_mode}
          clicked_editmode={() => this.props.onEditClicked("change_password")}
        />
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12}>
            <TextField
              required
              id="current_password"
              name="Type Current Password"
              label="Type Current Password"
              fullWidth
              autoComplete="Type Current Password"
              variant="standard"
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="type_new_password"
              name="Type New Password"
              label="Type New Password"
              fullWidth
              autoComplete="Type New Password"
              variant="standard"
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="retype_new_password"
              name="Retype New Password"
              label="Retype New Password"
              fullWidth
              autoComplete="Retype New Password"
              variant="standard"
              disabled={this.props.edit_mode ? false : true}
            />
          </Grid>
          <Grid item xs={12} display={this.props.edit_mode ? "block" : "none"}>
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
              onClick={() => this.props.onSaveClicked("change_password")}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ChangePassword;
