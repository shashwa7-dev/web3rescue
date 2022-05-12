import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function NotFound() {
  return (
    <Stack justifyContent="center" alignItems={"center"} spacing={5}>
      <Typography variant="h4">Wrong Route 404 :(</Typography>
      <Box>
        <img
          src="https://c.tenor.com/_SPMSIgwlT8AAAAC/kid-run.gif"
          style={{ height: "50vh", borderRadius: "1rem" }}
        />
      </Box>
    </Stack>
  );
}
