import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Title from "../Title";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";

export default function ChangePassword() {
  return (
    <React.Fragment>
      <Title pl={0} pt={0} mb={10} color="primary" variant="h7">
        Change Password
      </Title>
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
          />
        </Grid>
        <Grid item xs={12}>
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
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
