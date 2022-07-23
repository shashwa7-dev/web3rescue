import { ToastContainer } from "react-toastify";
import { AppTitle } from "./Components/commons";
import ContractSelector from "./Components/ContractSelector";
import Loader from "./Components/Loader";
import GlobalContextProvider, { useGCtx } from "./Context/context";
import Web3Rescue from "./Pages/index";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      />
    </div>
  );
}

export default App;
