import React from "react";
import styled from "styled-components";
import { loader } from "../Assets/assets";
import { useGCtx } from "../Context/context";

const LoaderCtr = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-family: var(--font-source-code);
  z-index: 100;
  .loaderGif {
    width: 100px;
  }
`;
export default function Loader() {
  const { loading } = useGCtx();
  return (
    loading && (
      <LoaderCtr>
        <img className="loaderGif" src={loader} alt="loading..." />
        <p>Please Wait...</p>
      </LoaderCtr>
    )
  );
}
