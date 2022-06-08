import { createContext, useContext, useEffect, useState } from "react";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";
import axios from "axios";
import { ethers } from "ethers";
import jwt_decode from "jwt-decode";

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

  //helper methods

  //STEP:1 mthd
  const generateERC20Transferdata = async (
    userwalletaddress,
    contractaddress,
    safeAddress
  ) => {
    setLoading(true);
    console.log(`data:${userwalletaddress}, ${contractaddress}, ${safeAddress}`);
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
      setLoading(false);
      setStep(1);
      return tx;
    } catch (err) {
      console.log("Error:", err.message);
      setLoading(false);
    }
  };

  //STEP 2: mthds
  //@api_call: 1
  const signSingleFlashbotTransaction = async (tx2, privatekey) => {
    console.log("Tx, pk", tx2, privatekey);
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
      setLoading(false);
      return signedTxBundle;
    } catch (err) {
      setLoading(false);
      console.log("Sign error:", err.message);
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
      setLoading(false);
      setStep(2);
      return tx;
    } catch (err) {
      setLoading(false);
      console.log("Error:", err.message);
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
      setLoading(false);
      if (!sim_status.data.success) {
        console.log(sim_status.data.result.data);
        setError(sim_status.data.result.data);
      }
      return sim_status.data;
    } catch (err) {
      setLoading(false);
      console.log("Simulation error:", err.message);
    }
  };

  const rescueAssets = async (rescueToken) => {
    setLoading(true);
    const data = {};
    const config = {
      headers: {
        Authorization: `Bearer ${rescueToken}`,
      },
    };
    try {
      const url = `https://api.web3rescue.com/rescue/submit-rescue?consent=true`;
      console.log("resk token:", rescueToken);
      const rescue_status = await axios.post(url, data, config);
      setLoading(false);
      return rescue_status.data;
    } catch (err) {
      setLoading(false);
      console.log("Rescue error:", err.message);
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
