import {
  Stack,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import KeyIcon from "@mui/icons-material/Key";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Step2() {
  const [pk, setPK] = useState({
    value: "",
    visibility: false,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("User PK:", pk.value);
  };

  const handleClickShowPassword = () => {
    setPK({
      ...pk,
      visibility: !pk.visibility,
    });
  };
  return (
    <Stack alignItems={"center"}>
      <Typography variant="h2">Step:2</Typography>
      <Stack
        onSubmit={handleFormSubmit}
        component="form"
        spacing={3}
        my={4}
        sx={{ width: "100%", maxWidth: "var(--max-width)" }}
      >
        <TextField
          label="Raw Transaction"
          value={` TxHash: \n Block:\n Nonce: \n Timestamp:`}
          variant="outlined"
          type="text"
          multiline
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiInputLabel-root": {
              color: `var(--color-yellow) !important`,
            }, //styles the label
            "& .MuiOutlinedInput-root": {
              background: "rgba(0, 0, 0, 0.7)",
              color: `var(--color-yellow) !important`,
              "& > fieldset": { borderColor: "var(--color-pink)!important" },
            },
          }}
        />

        <TextField
          label="Enter your compromised wallet address"
          variant="outlined"
          helperText="Note: We don't store/share you private key."
          type={pk.visibility ? "text" : "password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {!pk.visibility ? (
                    <VisibilityOff sx={{ color: "white" }} />
                  ) : (
                    <Visibility sx={{ color: "white" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
          onChange={(event) => setPK({ ...pk, value: event.target.value })}
          sx={{
            "& .MuiInputLabel-root": {
              color: "var(--color-blue-2) !important",
            }, //styles the label
            "& .MuiOutlinedInput-root": {
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              "& > fieldset": { borderColor: "var(--color-blue-2) !important" },
            },
          }}
        />
        <Button
          endIcon={<RotateLeftIcon />}
          variant="contained"
          color="warning"
          size="large"
          type="reset"
        >
          Reset
        </Button>
        <Link to="/step3" style={{ textDecoration: "none" }}>
          <Button
            endIcon={<ArrowForwardIosIcon />}
            variant="contained"
            color="info"
            size="large"
            type="submit"
            sx={{
              width: "100%",
              background: "var(--color-blue)",

              "&:hover": {
                background: "var(--color-pink)",
              },
            }}
          >
            Next
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
