import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  // This syntax ensures `this` is bound within handleClick.
  const navigation = useNavigate();

  function redirectMainPage() {
    navigation("/");
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "200px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: "100px",
        }}
      >
        <Stack spacing={4} alignItems="flex-start" justifyContent="center">
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            I have bad news for you
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            The page you are looking for might be removed or is temporarily
            unavailable
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "1rem" }}
            onClick={redirectMainPage}
          >
            Back to homepage
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default PageNotFound;
