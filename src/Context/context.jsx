import { createContext, useContext, useEffect, useState } from "react";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";
import axios from "axios";
import { ethers } from "ethers";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GlobalContext = createContext({});

export function useGCtx() {
  return useContext(GlobalContext);
}

export default function GlobalContextProvider({ children }) {
  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    comp_add: "",
    safe_add: "",
    final_data: "",
  });
  const [contractAddress, setContractAddress] = useState(null);
  const [showContractSelector, setShowContractSelector] = useState(false);
  const navigate = useNavigate();
  //helper methods

  //STEP:1 mthd
  const generateERC20Transferdata = async (
    userwalletaddress,
    contractaddress,
    safeAddress
  ) => {
    setLoading(true);
    console.log(
      `data:${userwalletaddress}, ${contractaddress}, ${safeAddress}`
    );
    try {
      const url = `https://api.web3rescue.com/rescue/fetch-transactiondata`;
      const data = {
        userwalletaddress: userwalletaddress,
        contractaddress: contractaddress,
        safeAddress: safeAddress,
      };
      const datafromresponse = await axios.post(url, data);
      const tx = await datafromresponse.data;
      console.log("tx", tx);
      localStorage.setItem("raw_tx", JSON.stringify(tx));
      setStep(1);
      navigate("/step2");
      toast.success("Txn Created.");
      return tx;
    } catch (err) {
      navigate("/"); //step1
      toast.error("Invalid Credential.");
      console.log("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  //STEP 2: mthds
  //@api_call: 1
  const signSingleFlashbotTransaction = async (tx2, privatekey) => {
    setLoading(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/eth"
      );
      const compromisedwallet = new ethers.Wallet(privatekey, provider);
      const authSigner = new ethers.Wallet(
        "0x2000000000000000000000000000000000000000000000000000000000000000"
      );
      const flashbotProvider = await FlashbotsBundleProvider.create(
        provider,
        authSigner,
        "https://relay.flashbots.net"
      );
      const signedTxBundle = await flashbotProvider.signBundle([
        {
          signer: compromisedwallet,
          transaction: tx2,
        },
      ]);
      toast.success("Txn Signed Successfully.");
      return signedTxBundle;
    } catch (err) {
      toast.error("Invalid Private Key.");
      console.log("Sign error:", err.message);
    } finally {
      setLoading(false);
    }
  };
  //@api_call: 2
  const initiateRescueRequest = async (
    userwalletaddress,
    contractaddress,
    safeAddress,
    signedTransaction
  ) => {
    setLoading(true);
    try {
      const url = `https://api.web3rescue.com/rescue/initiate-rescue`;
      const data = {
        userwalletaddress: userwalletaddress,
        contractaddress: contractaddress,
        safeAddress: safeAddress,
        signedTransaction: signedTransaction,
      };
      const datafromresponse = await axios.post(url, data);
      const tx = await datafromresponse.data;
      setStep(2);
      toast.success("Rescue Initiated.");
      return tx;
    } catch (err) {
      toast.error("Rescue Request Failed.");
      console.log("Error:", err.data);
    } finally {
      setLoading(false);
    }
  };

  //STEP:3 mthds
  const fetchOrder = async (paymentId) => {
    try {
      const url = `https://sideshift.ai/api/v1/orders/${paymentId}`;
      const orderStatus = await axios.get(url);
      return orderStatus;
    } catch (err) {
      console.log("Fetch order error:", err.message);
    }
  };

  const simulatePaymentTransaction = async (rescueToken) => {
    setLoading(true);
    const data = {};
    const config = {
      headers: {
        Authorization: `Bearer ${rescueToken}`,
      },
    };
    try {
      const url = `https://api.web3rescue.com/rescue/submit-rescue`;
      console.log("resk token:", rescueToken);
      const sim_status = await axios.post(url, data, config);
      if (!sim_status.data.success) {
        console.log(sim_status.data.result.data);
        setError(sim_status.data.result.data);
      }
      return sim_status.data;
    } catch (err) {
      toast.error("Txn Simulation Failed.");
      console.log("Simulation error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const rescueAssets = async (rescueToken) => {
    setLoading(true);
    try {
      const url = `https://api.web3rescue.com/rescue/submit-rescue?consent=true`;
      console.log("resk token:", rescueToken);
      const rescue_status = await axios.post(url, data, config);
      return rescue_status.data;
    } catch (err) {
      toast.error("Assets Rescue Failed.");
      console.log("Rescue error:", err.message);
    } finally {
      setLoading(false);
    }
  };
  const decodeJWT_token = (token) => jwt_decode(token);

  useEffect(() => {
    let nulify_error;
    if (!(error === null)) {
      nulify_error = setTimeout(() => {
        console.log("err nulified!");
        setError(null);
      }, 3000);
    }
    return () => {
      clearTimeout(nulify_error);
    };
  }, [error]);
  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        generateERC20Transferdata,
        signSingleFlashbotTransaction,
        initiateRescueRequest,
        decodeJWT_token,
        simulatePaymentTransaction,
        rescueAssets,
        fetchOrder,
        error,
        setError,
        step,
        setStep,
        contractAddress,
        setContractAddress,
        showContractSelector,
        setShowContractSelector,
        userData,
        setUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
