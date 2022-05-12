import { createTheme, Stack, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalContextProvider from "./Context/context";
import Hero from "./Pages/Hero";
import NotFound from "./Pages/NotFound";
import Step1 from "./Pages/Step1";
import Step2 from "./Pages/Step2";
import Step3 from "./Pages/Step3";

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: ["JetBrains Mono", "monospace"].join(","),
        color: "white",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack className="App">
        <GlobalContextProvider>
          <Routes>
            <Route exact path="/" element={<Hero />} />
            <Route exact path="/step1" element={<Step1 />} />
            <Route exact path="/step2" element={<Step2 />} />
            <Route exact path="/step3" element={<Step3 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GlobalContextProvider>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
