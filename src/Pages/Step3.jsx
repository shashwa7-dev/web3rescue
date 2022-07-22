import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { copy_icon, eth_icon } from "../Assets/assets";
import { PageBtn, PageTitle } from "../Components/commons";
import { useGCtx } from "../Context/context";

const Step3Ctr = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  gap: 1rem;
  .head {
    display: grid;
    place-items: center;
    img {
      width: 50px;
    }
    .eth_pay {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.25rem;
      font-weight: bolder;
      gap: 0.5rem;
    }
  }
  .add_field {
    width: 100%;
    max-width: var(--max-width);
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    gap: 1rem;
    border: 2px solid;
    border-radius: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    position: relative;
    .deposite_add {
      max-width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgba(245, 179, 0, 1);
    }
    img {
      width: 25px;
    }
  }
  .note {
    text-align: left;
    width: 100%;
    max-width: var(--max-width);
  }
  .btns {
    width: 100%;
    text-align: center;
    margin-top: 2rem;
  }
`;
export default function Step3() {
  const { paymentId, rescueToken } = useParams();
  const { rescueAssets, fetchOrder, setStep, simulatePaymentTransaction } =
    useGCtx();
  const [depositeAddress, setDepositeAddress] = useState("");
  const [enableBtn, setEnableBtn] = useState({
    secure_btn: false,
    rescue_btn: false,
  });
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const handleWalletCopy = () => {
    window.navigator.clipboard.writeText(`${depositeAddress}`);
    setShowCopyAlert(true);
    setTimeout(() => setShowCopyAlert(false), 1000);
  };

  //methods
  const checkOrderStatus = async () => {
    const resp = await fetchOrder(paymentId);
    const order_status = await resp.data;
    setDepositeAddress(order_status.depositAddress.address);
    console.log("Payment Status:", order_status);
    if (order_status.deposits.length > 0) {
      if (order_status.deposits[0].status === "settled") {
        console.log("Payment settled!");
        setEnableBtn({ secure_btn: true, rescue_btn: false });
        return { settled: true };
      }
    }
    return { settled: false };
  };
  const simulateTX = async () => {
    const sim_status = await simulatePaymentTransaction(rescueToken);
    console.log("sim_status:", sim_status);
    if (sim_status.success) {
      setEnableBtn({ secure_btn: false, rescue_btn: true });
    }
  };

  const legitTX = async () => {
    const rescue_status = await rescueAssets(rescueToken);
    console.log("rescue_status:", rescue_status);
  };
  //to generate ellipses in middle of address text
  function trimAddress(str) {
    if (str.length > 12) {
      return str.substr(0, 10) + "..." + str.substr(str.length - 6, str.length);
    }
    return str;
  }
  useEffect(() => {
    setStep(3);
    const paymentStatus = window.setInterval(async () => {
      const status = await checkOrderStatus();
      if (!status.settled) {
        window.clearInterval(paymentStatus);
      }
    }, 1000);
    return () => window.clearInterval(paymentStatus);
  }, []);

  return (
    <Step3Ctr>
      <div className="head">
        <PageTitle>Payment includes the Gas Fee’s</PageTitle>
        <div className="eth_pay">
          <img src={eth_icon} alt="" />
          <h2>0.05 ETH</h2>
        </div>
      </div>
      <div className="add_field" onClick={handleWalletCopy}>
        <p className="deposite_add">
          {showCopyAlert
            ? "Copied!"
            : depositeAddress
            ? depositeAddress
            : "loading"}
        </p>
        <img src={copy_icon} alt="" onClick={handleWalletCopy} />
      </div>
      <p className="note">
        Note: Pay the gas fees to above address to secure the wallet
      </p>
      <div className="btns">
        {!enableBtn.rescue_btn && (
          <PageBtn
            onClick={simulateTX}
            // disabled={!enableBtn.secure_btn}
          >
            Simulate Transaction
          </PageBtn>
        )}
        {enableBtn.rescue_btn && (
          <PageBtn onClick={legitTX}>Rescue your Assets</PageBtn>
        )}
      </div>
    </Step3Ctr>
  );
}
