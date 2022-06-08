import { Route, Routes } from "react-router-dom";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import styled from "styled-components";
import Timeline from "../Components/Timeline.jsx";
import { useGCtx } from "../Context/context.jsx";

const AppContainer = styled.div`
  width: 100%;
  max-width: 1010px;
  padding: clamp(1rem, 3vw, 2rem);
  display: grid;
  place-items: center;
  gap: 4rem;
  background: rgba(28, 28, 28, 0.7);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border: 1px solid rgba(28, 28, 28, 0.3);
`;

export default function Web3Rescue() {
  const { step } = useGCtx();
  return (
    <AppContainer>
      <Timeline stage={step} />
      <Routes>
        <Route exact path="/" element={<Step1 />} />
        <Route exact path="/" element={<Step2 />} />
      </Routes>
    </AppContainer>
  );
}