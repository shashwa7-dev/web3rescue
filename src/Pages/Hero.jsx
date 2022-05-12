import { Stack, Typography, Button, Box, Grid } from "@mui/material";
import React from "react";
import BallotIcon from "@mui/icons-material/Ballot";
import KeyIcon from "@mui/icons-material/Key";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";

export default function Hero() {
  const _grid_item = {
    border: "1px solid",
    borderRadius: ".5rem",
    background: "#000000bb",
    padding: {
      xs: ".5rem",
      md: "1rem",
    },
  };
  const _style_icon = {
    fontSize: {
      xs: "35px",
      md: "50px",
    },
  };
  return (
    <Stack p={2} justifyContent="center" alignItems="center">
      <Box>
        <Typography
          variant="h2"
          color="var(--color-yellow)"
          fontSize={{ xs: "2.5rem", sm: "3rem", md: "4rem" }}
        >
          Web3Rescue.io
        </Typography>
        <Typography
          variant="h4"
          my={2}
          fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.8rem" }}
        >
          Rescue your NFTs and ERC tokens from compromised accounts.
        </Typography>
      </Box>
      <Grid
        container
        gap={3}
        sx={{ placeItems: "center", maxWidth: "1000px", margin: "2rem auto" }}
      >
        <Grid item xs sx={_grid_item}>
          <BallotIcon sx={_style_icon} />
          <Typography variant="h5" color="var(--color-pink)">
            Step 1:
          </Typography>
          <Typography variant="h6">Enter NFT details</Typography>
        </Grid>
        <Grid item xs sx={_grid_item}>
          <KeyIcon sx={_style_icon} />
          <Typography variant="h5" color="var(--color-pink)">
            Step 2:
          </Typography>
          <Typography variant="h6">
            Sign
            <br /> Transaction
          </Typography>
        </Grid>
        <Grid item xs sx={_grid_item}>
          <AccountBalanceWalletIcon sx={_style_icon} />
          <Typography variant="h5" color="var(--color-pink)">
            Step 3:
          </Typography>
          <Typography variant="h6" color="">
            Pay
            <br /> Rescue Fee
          </Typography>
        </Grid>
        <Grid item xs sx={_grid_item}>
          <LockIcon sx={_style_icon} />
          <Typography variant="h5" color="var(--color-pink)" s>
            Step 4:
          </Typography>
          <Typography variant="h6">Secure your asset Asset</Typography>
        </Grid>
      </Grid>
      <Stack my={4} spacing={2}>
        <Typography variant="body2">
          Note: We don't store/share your private key.
        </Typography>

        <Link to="/step1" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="warning"
            size="large"
            sx={{
              width: "100%",
              background: "var(--color-blue)",
            }}
          >
            Proceed
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
