import { Route, Routes } from "react-router-dom";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import styled from "styled-components";
import Timeline from "../Components/Timeline.jsx";
import { useGCtx } from "../Context/context.jsx";

const AppContainer = styled.div`
  width: 100%;
 max-width: 800px;
  overflow: hidden;
  padding: clamp(1rem, 3vw, 2rem);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background: rgba(28, 28, 28, 0.7);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(28, 28, 28, 0.3);
`;

export default function Web3Rescue() {
  const { step } = useGCtx();
  return (
    <AppContainer>
      <Timeline stage={step} />
      <Routes>
        <Route exact path="/" element={<Step1 />} />
        <Route exact path="/step2" element={<Step2 />} />
        <Route
          exact
          path="/step3/:rescueToken/:paymentId"
          element={<Step3 />}
        />
      </Routes>
    </AppContainer>
  );
}
