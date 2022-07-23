import React from "react";
import styled from "styled-components";

const TimelineCtr = styled.div`
  width: 100%;
  max-width: 500px;
  display: grid;
  place-items: center;
  position: relative;
  margin: 2rem 0;
  text-align: center;
  transition: all 0.3s ease;
  .progress_tracker {
    width: 90%;
    max-width: 430px;
    display: grid;
    place-items: center;
    position: relative;
    background-color: white;
    height: 0.07rem;
    .timeline_progress {
      width: 100%;
      background: linear-gradient(268.5deg, #fb03f5 -11.69%, #aa9cff 112.48%);
      padding: 0.1rem;
      margin-right: auto;
      transition: all 1s ease;
    }
    .check_points {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      .check_point {
        border: 1px solid white;
        min-width: fit-content;
        min-height: fit-content;
        display: grid;
        place-items: center;
        font-size: 0.8rem;
        width: clamp(24px, 3vw, 30px);
        height: clamp(24px, 3vw, 30px);
        background: black;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        font-family: var(--font-b);
        transition: all 0.3s ease;
      }
    }
  }
  .timeline_contents {
    width: 100%;
    position: absolute;
    top: 27px;
    display: flex;
    justify-content: space-between;
    font-size: clamp(0.8rem, 2vw, 1rem);
  }
`;

const activeStage = {
  background: "var(--color-gd2)",
};
const items = ["Enter Details", "Sign Transaction", "Pay & Rescue"];

export default function Timeline({ stage }) {
  const totalItems = items.length;

  const progressBarWidth =
    totalItems > 1 && stage < 4 ? ((stage - 1) / (totalItems - 1)) * 100 : 0;
  return (
    <TimelineCtr>
      <div className="progress_tracker">
        <div
          className="timeline_progress"
          style={{ width: `${progressBarWidth}%` }}
        ></div>
        <div className="check_points">
          <div className="check_point" style={stage > 0 ? activeStage : {}}>
            <span>1</span>
          </div>
          <div className="check_point" style={stage > 1 ? activeStage : {}}>
            <span>2</span>
          </div>
          <div className="check_point" style={stage > 2 ? activeStage : {}}>
            <span>3</span>
          </div>
        </div>
      </div>

      <div className="timeline_contents">
        <div className="timeline_content">{items[0]}</div>
        <div className="timeline_content">{items[1]}</div>
        <div className="timeline_content">{items[2]}</div>
      </div>
    </TimelineCtr>
  );
}
