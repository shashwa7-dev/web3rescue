import { Stack, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useNavigate } from "react-router-dom";
import { useGCtx } from "../Context/context";

export default function Step1() {
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("User Data:", userData);
    navigate("/step2");
  };
  const { userData, setUserData } = useGCtx();
  return (
    <Stack alignItems={"center"}>
      <Typography variant="h2">Step:1</Typography>
      <Stack
        onSubmit={handleFormSubmit}
        component="form"
        spacing={3}
        my={4}
        sx={{ width: "100%", maxWidth: "var(--max-width)" }}
      >
        <TextField
          label="Enter NFT / ERC token Details"
          variant="outlined"
          type="text"
          required
          autoFocus
          onChange={(event) =>
            setUserData({ ...userData, nft_erc_add: event.target.value })
          }
          sx={{
            "& .MuiInputLabel-root": {
              color: `var(--color-blue-2) !important`,
            }, //styles the label
            "& .MuiOutlinedInput-root": {
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              "& > fieldset": { borderColor: "white !important" },
            },
          }}
        />
        <TextField
          label="Enter NFT ID / ERC decimal"
          variant="outlined"
          type="text"
          required
          onChange={(event) =>
            setUserData({ ...userData, nft_erc_dec: event.target.value })
          }
          sx={{
            "& .MuiInputLabel-root": {
              color: `var(--color-blue-2)!important`,
            }, //styles the label
            "& .MuiOutlinedInput-root": {
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              "& > fieldset": { borderColor: "white !important" },
            },
          }}
        />
        <TextField
          label="Enter your compromised wallet address"
          variant="outlined"
          type="text"
          required
          onChange={(event) =>
            setUserData({ ...userData, comp_add: event.target.value })
          }
          sx={{
            "& .MuiInputLabel-root": {
              color: "var(--color-yellow) !important",
            }, //styles the label
            "& .MuiOutlinedInput-root": {
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              "& > fieldset": { borderColor: "var(--color-yellow) !important" },
            },
          }}
        />
        <TextField
          label="Enter your safe wallet address"
          variant="outlined"
          type="text"
          required
          onChange={(event) =>
            setUserData({ ...userData, safe_add: event.target.value })
          }
          sx={{
            "& .MuiInputLabel-root": {
              color: `var(--color-neon) !important`,
            }, //styles the label
            "& .MuiOutlinedInput-root": {
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              "& > fieldset": {
                borderColor: `var(--color-neon)!important`,
              },
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
        <Button
          endIcon={<ArrowForwardIosIcon />}
          variant="contained"
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
      </Stack>
    </Stack>
  );
}
