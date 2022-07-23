import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { arrowD_icon, copy_icon } from "../Assets/assets";
import { PageBtn, PageForm, PageInput, PageTitle } from "../Components/commons";
import { useGCtx } from "../Context/context";

const Step1Ctr = styled.div`
  width: 100%;
  .contract_selector {
    --borderWidth: 8px;
    width: 60%;
    position: relative;
    display: flex;
    border-radius: var(--borderWidth);

    .selector_input {
      position: relative;
      background-color: #353535;
      font-family: var(--font-m);
      font-size: clamp(1rem, 2vw, 1.25rem);
      overflow: hidden;
      text-overflow: ellipsis;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      width: 55%;
      cursor: pointer;
      padding: 1rem;
      .token_address {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        img {
          width: 18px;
        }
      }
      .tooltiptext {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        text-align: center;
        display: grid;
        place-items: center;
        font-size: smaller;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        outline: none;
        /* Position the tooltip */
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
    .selector_btn {
      display: flex;
      width: 45%;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      background: var(--color-gd);
      cursor: pointer;
      font-family: var(--font-b);
      animation: animatedGradient 3s infinite linear;
      background-size: 300% 300%;

      img {
        width: 15px;
        filter: invert(1);
      }
    }

    @media screen and (max-width: 45em) {
      width: 100%;
    }
  }
`;
export default function Step1() {
  const {
    setStep,
    contractAddress,
    setContractAddress,
    userData,
    setUserData,
    setShowContractSelector,
    generateERC20Transferdata,
  } = useGCtx();
  const step1FormRef = useRef();
  const navigate = useNavigate(null);
  const [addressCopied, setAddressCopied] = useState(false);

  //to generate ellipses in middle of address text
  function trimAddress(str) {
    if (str.length > 12) {
      return str.substr(0, 9) + "..." + str.substr(str.length - 4, str.length);
    }
    return str;
  }
  const copyToClipboard = (address) => {
    setAddressCopied(true);
    window.navigator.clipboard.writeText(address);
    setTimeout(() => setAddressCopied(false), 1000);
  };

  const proceedSubmission = async () => {
    step1FormRef.current.reset();
    const finalData = await generateERC20Transferdata(
      userData?.comp_add,
      contractAddress,
      userData?.safe_add
    );
    console.log("final data:", finalData);
    setUserData({
      ...userData,
      final_data: finalData,
    });
  };

  const handleStep1Form = (event) => {
    event.preventDefault();
    if (contractAddress) {
      proceedSubmission();
    }
  };

  useEffect(() => {
    setContractAddress(null);
    setStep(1);
  }, []);
  return (
    <Step1Ctr>
      <PageTitle>
        Submit info so we can generate a rescue transaction data for rescue.
      </PageTitle>
      <PageForm onSubmit={handleStep1Form} ref={step1FormRef}>
        <PageInput
          type="text"
          placeholder="Enter your compromised wallet address*"
          required
          onChange={(event) =>
            setUserData({ ...userData, comp_add: event.target.value })
          }
          autoFocus
        />
        <div className="contract_selector">
          <div
            className="selector_input"
            onClick={() => copyToClipboard(contractAddress)}
          >
            {contractAddress ? (
              <div className="token_address">
                <span>{trimAddress(contractAddress)}</span>
                <img
                  src={copy_icon}
                  alt="copy"
                  style={{ filter: "invert(-1)" }}
                />
              </div>
            ) : (
              <span style={{ color: "gray" }}>Your token ?</span>
            )}

            {addressCopied && contractAddress && (
              <span className="tooltiptext">Copied</span>
            )}
          </div>
          <div
            className="selector_btn"
            onClick={() => setShowContractSelector(true)}
          >
            <span>Select a token</span>
            <img src={arrowD_icon} alt="" />
          </div>
        </div>
        <PageInput
          type="text"
          placeholder="Enter your safe wallet address*"
          onChange={(event) =>
            setUserData({ ...userData, safe_add: event.target.value })
          }
          required
        />
        <PageBtn type="submit">Submit</PageBtn>
      </PageForm>
    </Step1Ctr>
  );
}
