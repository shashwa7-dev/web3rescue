import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { eye_closed_icon, eye_open_icon, key_icon } from "../Assets/assets";
import { PageBtn, PageInput, PageTitle } from "../Components/commons";
import { useGCtx } from "../Context/context";

const Step2Ctr = styled.div`
  display: grid;
  place-items: center;
  gap: 1rem;
  .raw_tx {
    display: block;
    max-height: 30vh;
    width: min(100%, var(--max-width));
    background-color: rgba(1, 0, 47, 0.3);
    padding: 1rem 1.5rem;
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 0.5rem;
    white-space: wrap;
    border: 1px solid;
    overflow-wrap: break-word;
    font-family: var(--font-source-code);
    white-space: normal; //this is the one that gets you all the time
    .title {
      color: yellow;
    }
    .raw_tx_data {
      font-size: 0.9rem;
      margin: 0.25rem 0;
    }
    .raw_tx_key {
      color: var(--color-imp);
    }
    .signed_tx {
      color: #ff904f;
    }
  }
  .userPKip {
    width: 100%;
    display: grid;
    gap: 0.5rem;
    place-items: center;
    text-align: left;
    max-width: var(--max-width);

    .ipField {
      display: flex;
      width: 100%;
      position: relative;
      img {
        position: absolute;
        margin: auto 1rem;
        top: 0;
        bottom: 0;
        left: 0;
        opacity: 0.8;
      }
      .eyecons {
        position: absolute;
        display: grid;
        place-items: center;
        top: 0;
        bottom: 0;
        right: 0;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        width: 55px;
        background: rgb(37, 37, 37);
        cursor: pointer;
      }
      input {
        padding-left: 3rem;
      }
    }
    p {
      width: 100%;
      font-size: 0.9rem;
    }
  }
`;
export default function Step2() {
  const navigate = useNavigate();
  const {
    setStep,
    userData,
    contractAddress,
    initiateRescueRequest,
    signSingleFlashbotTransaction,
    decodeJWT_token,
  } = useGCtx();
  const [pk, setPk] = useState({
    val: "",
    visibility: false,
  });

  const rawTxDiv = useRef(null);
  const [signedBundle, setSignBundle] = useState(null);
  const data_tx = Object.entries(userData.final_data);

  const handleClickShowPassword = () => {
    setPk({ ...pk, visibility: !pk.visibility });
  };
  const signTX = async () => {
    const signedTx = await signSingleFlashbotTransaction(
      userData.final_data,
      pk.val
    );
    if (signedTx) setSignBundle(signedTx[0]);
  };

  const sendSignedBundle = async () => {
    const rescue_token = await initiateRescueRequest(
      userData.comp_add,
      contractAddress,
      userData.safe_add,
      signedBundle
    );
    //get rescue token -> decode rescure token -> extract payment id
    console.log("Rescue token:", rescue_token);
    const decoded_token = decodeJWT_token(rescue_token.rescueToken);
    const paymentId = decoded_token.paymentID;
    navigate(`/step3/${rescue_token.rescueToken}/${paymentId}`);
    console.log("Decoded rescue token:", decoded_token);
  };
  //with smooth-scroll
  const scrollToBottomWithSmoothScroll = () => {
    rawTxDiv.current.scrollTo({
      top: rawTxDiv.current.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToBottomWithSmoothScroll();
    if (userData.comp_add === "") navigate("/");
    setStep(2);
  }, [data_tx]);

  return (
    <Step2Ctr>
      <PageTitle>Sign the raw transaction</PageTitle>
      <code className="raw_tx" ref={rawTxDiv}>
        <p className="title">
          <u>Raw Tx</u>
        </p>
        {data_tx.map((tx, idx) => {
          return (
            <p className="raw_tx_data" key={"k" + tx[0] + idx}>
              <span className="raw_tx_key">{tx[0]} =</span>{" "}
              <span className="raw_tx_val">{JSON.stringify(tx[1])}</span>
            </p>
          );
        })}
        {signedBundle && (
          <p className="raw_tx_data">
            <span className="raw_tx_key">SignedBundle =</span>{" "}
            <span className="raw_tx_val signed_tx">{signedBundle}</span>
          </p>
        )}
      </code>
      <div className="userPKip">
        <div className="ipField">
          <img src={key_icon} alt="" />
          <PageInput
            type={pk.visibility ? "text" : "password"}
            placeholder="Enter your private key*"
            onChange={(event) => setPk({ ...pk, val: event.target.value })}
          />
          <div className="eyecons" onClick={handleClickShowPassword}>
            {pk.visibility ? (
              <img src={eye_closed_icon} alt="" />
            ) : (
              <img src={eye_open_icon} alt="" />
            )}
          </div>
        </div>

        <p>Note: We do not store/share your private keys</p>
      </div>
      {signedBundle === null && <PageBtn onClick={signTX}>Sign</PageBtn>}
      {!(signedBundle === null) && (
        <PageBtn onClick={sendSignedBundle}>Proceed</PageBtn>
      )}
    </Step2Ctr>
  );
}
