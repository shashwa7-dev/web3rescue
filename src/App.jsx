import { Route, Routes } from "react-router-dom";
import { AppTitle } from "./Components/commons";
import ContractSelector from "./Components/ContractSelector";
import Loader from "./Components/Loader";
import GlobalContextProvider, { useGCtx } from "./Context/context";
import Web3Rescue from "./Pages/index";

const _ContractSelector = () => {
  const { showContractSelector } = useGCtx();
  return showContractSelector && <ContractSelector />;
};

function App() {
  return (
    <div className="App">
      <AppTitle>
        <span style={{ fontFamily: "var(--font-b)" }}>Web3</span>resuce
      </AppTitle>
      <GlobalContextProvider>
        <Web3Rescue />
        <_ContractSelector />
        <Loader />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
