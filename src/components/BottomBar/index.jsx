import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import GradientText from "../GradientText";

const BottomBar = () => {
  return (
    <>
      <BottomBox>
        <GradientText size={24}>
          <a href="https://twitter.com/Invisicash" target="_blank">
            Twitter
          </a>
          <a href="https://t.me/InvisiCash" target="_blank">
            Telegram
          </a>
          <a href="https://app.uniswap.org/#/swap?exactField=input&inputCurrency=ETH&outputCurrency=0x02074951886Acc3d58D99D55040165216666A496&chain=mainnet" target="_blank">
            Uniswap
          </a>
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
  a {
    margin-left: 21px;
    margin-right: 21px;
    cursor: pointer;
  }
`;
export default BottomBar;
