import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Step3() {
  const [txHash, setTxHash] = useState("");
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const handleWalletCopy = () => {
    window.navigator.clipboard.writeText(
      "0x43541645f986b298D430Aa45E24549a9eAa0EF7E"
    );
    setShowCopyAlert(true);
    setTimeout(() => setShowCopyAlert(false), 2000);
  };

  const onTxHashSubmit = (event) => {
    event.preventDefault();
    console.log("submitted hash:", txHash);
  };
  return (
    <Stack spacing={5} alignItems={"center"}>
      <Typography variant="h2">Final Step</Typography>
      <Typography variant="h4" color="var(--color-yellow)">
        Pay{" "}
        <span
          style={{
            background: "var(--color-pink)",
            color: "#fff",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          0.05
        </span>{" "}
        Eth to below wallet address
        <br /> to{" "}
        <span
          style={{
            color: "var(--color-blue-2)",
            fontWeight: "bold",
          }}
        >
          secure your assets.
        </span>
      </Typography>

      <Stack
        alignItems={"center"}
        spacing={3}
        component="form"
        onSubmit={onTxHashSubmit}
        sx={{ width: "100%", maxWidth: "var(--max-width)" }}
      >
        <TextField
          value="0x43541645f986b298D430Aa45E24549a9eAa0EF7E"
          variant="outlined"
          helperText={showCopyAlert ? "Copied" : ""}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleWalletCopy}
                >
                  <ContentCopyIcon sx={{ color: "white" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",

            "& .MuiInputBase-input": {
              textOverflow: "ellipsis",
              fontSize: "clamp(1.25rem,2vw,1.5rem)",
            },
            "& .MuiOutlinedInput-root": {
              color: "var(--color-neon)",
              background: "rgba(0,0,0,0.5)",

              "& > fieldset": {
                borderColor: `var(--color-blue-2)!important`,
              },
            },
          }}
        />

        <TextField
          label="Enter your transaction hash"
          variant="outlined"
          type="text"
          required
          onChange={(event) => setTxHash(event.target.value)}
          sx={{
            width: "100%",

            "& .MuiInputLabel-root": {
              textOverflow: "ellipsis",
              color: `var(--color-yellow) !important`,
            }, //styles the label
            "& .MuiOutlinedInput-root": {
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              "& > fieldset": {
                borderColor: `var(--color-yellow)!important`,
              },
            },
          }}
        />
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
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
