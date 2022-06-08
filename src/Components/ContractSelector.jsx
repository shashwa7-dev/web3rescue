import React, { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { cross_icon } from "../Assets/assets";
import { useGCtx } from "../Context/context";
import data from "../data";

const ContractPopUp = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  .popup {
    width: 90%;
    max-width: 400px;
    border-radius: 1rem;
    padding: 0.35rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    background: linear-gradient(
      153.97deg,
      #fce6fc 26.99%,
      #e73fe4 49.4%,
      #4c00ff 83.59%
    );

    animation: animatedGradient 3s infinite linear;
    background-size: 300% 300%;
    .head {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      padding: 1rem;
      padding-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-b);
      font-size: 1.25rem;
      background: linear-gradient(91.97deg, #955d94 4.03%, #d8a2c5 117.29%);
      img {
        width: clamp(15px, 2vw, 17px);
        filter: invert(1);
        cursor: pointer;
      }
    }
    .body {
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      padding: 1rem;
      display: grid;
      place-items: center;
      background: rgb(33, 33, 33);

      input {
        width: 100%;
        padding: 0.75rem;
        background: rgba(176, 176, 176, 0.3);
        border-radius: 0.5rem;
        border: 1.5px solid #cf77ce;
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .submit_add_btn {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #cf77ce;
        color: white;
        background: rgba(176, 176, 176, 0.3);
      }
      .tokens_list {
        width: 100%;
        max-height: 40vh;
        min-height: 40vh;
        overflow-x: hidden;
        overflow-y: scroll;
        margin-top: 1rem;

        &::-webkit-scrollbar {
          width: 7px;
        }

        &::-webkit-scrollbar-track {
          background: none; /* color of the tracking area */
        }
        &::-webkit-scrollbar-thumb {
          background: var(--color-gd); /* color of the scroll thumb */
          border-radius: 20px; /* roundness of the scroll thumb */
        }
        ::-webkit-scrollbar-track-piece:end {
          background: transparent;
          margin-bottom: 10px;
        }

        ::-webkit-scrollbar-track-piece:start {
          background: transparent;
          margin-top: 10px;
        }

        .token {
          width: 100%;
          display: flex;
          gap: 1rem;
          padding: 0.75rem;
          cursor: pointer;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          margin: 0.25rem 0;
          &:hover {
            background-color: #955d94;
            font-size: 1.1rem;
          }

          .token_icon {
            width: 30px;
            height: 30px;
            background: #ffffff;
            padding: 0.25rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
`;

export default function ContractSelector() {
  const [query, setQuery] = useState("");
  const { setContractAddress, setShowContractSelector } = useGCtx();
  const inputRef = useRef();
  let filteredTokens = [];

  const _setTokenAdd = (event) => {
    setQuery(inputRef.current.value);
    setContractAddress(inputRef.current.value);
    if (event.key === "Enter") setShowContractSelector(false);
  };
  const _setTokenAddOnSubmit = () => {
    setContractAddress(inputRef.current.value);
    setShowContractSelector(false);
  };

  const _getTokenAdd = (address) => {
    console.log("selected address:", address);
    setContractAddress(address);
    setShowContractSelector(false);
  };
  return (
    <ContractPopUp>
      <div className="popup">
        <div className="head">
          <span>Select a Contract</span>
          <img
            src={cross_icon}
            alt="close"
            onClick={() => setShowContractSelector(false)}
          />
        </div>

        <div className="body">
          <input
            type="search"
            ref={inputRef}
            onChange={_setTokenAdd}
            onKeyDown={_setTokenAdd}
            placeholder="search contract or paste address here"
          />
          <div className="tokens_list">
            {
              (filteredTokens = data.contract_options
                .filter((token) => {
                  if (query === "") {
                    return token;
                  } else if (
                    token.name.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return token;
                  }
                })
                .map((token, idx) => (
                  <div
                    className="token"
                    key={idx + token.name + token.address}
                    onClick={() => _getTokenAdd(token.address)}
                  >
                    <img src={token.icon} alt="" className="token_icon" />
                    <h3 className="token_name">{token.name}</h3>
                  </div>
                )))
            }
            {filteredTokens.length < 1 && (
              <button className="submit_add_btn" onClick={_setTokenAddOnSubmit}>
                Submit Address
              </button>
            )}
          </div>
        </div>
      </div>
    </ContractPopUp>
  );
}
