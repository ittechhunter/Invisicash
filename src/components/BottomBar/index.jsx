import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import GradientText from "../GradientText";

const BottomBar = () => {
  return (
    <>
      <BottomBox>
        <GradientText size={24}>
          <span onClick={() => window.open("https://twitter/#")}>Twitter</span>
          <span onClick={() => window.open("https://telegram/#")}>Telegram</span>
          <span onClick={() => window.open("https://uniswap/#")}>Uniswap</span>
        </GradientText>
      </BottomBox>
    </>
  );
};

const BottomBox = styled(Box)`
  position: absolute;
  bottom: 55px;
  left: 50%;
  transform: translate(-50%, 0);
  span {
    margin-left: 21px;
    margin-right: 21px;
    cursor: pointer;
  }
`;
export default BottomBar;
