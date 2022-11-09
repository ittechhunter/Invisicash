/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";
import { useAddress, useWeb3Context } from "../../hooks/web3Context";
import useLockInfo from "../../hooks/useLockInfo";
import GradientText from "../GradientText";

function Topbar() {
  const md = useMediaQuery("(max-width: 1100px)");
  const sm = useMediaQuery("(max-width: 710px)");
  const account = useAddress();
  const { connect, disconnect } = useWeb3Context();
  const { totalLocked, fetchTotalLocked } = useLockInfo();

  const connectWallet = () => {
    connect().then((msg) => {
      console.log(msg);
    });
  };

  const disconnectWallet = () => {
    disconnect().then((msg) => {
      console.log(msg);
    });
  };

  const getAccountString = (address) => {
    const account = address;
    const len = account.length;
    return `0x${account.substr(2, 4)}...${account.substr(len - 4, len - 1)}`;
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        connectWallet();
      });
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    }
  }, [account]);

  useEffect(() => {
    fetchTotalLocked();
  }, []);

  return (
    <StyledContainer>
      <RowContainer>
        <Logo>
          <img src="/images/logo.png"></img>
          <GradientText size={32} weight={500}>
            Invisicash
          </GradientText>
        </Logo>
        <Box display="flex" gap="30px">
          <GradientBox>
            <Box>Mixing Pool</Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px">
              <ValueBox>18,257</ValueBox>
              <SymbolBox>ETH</SymbolBox>
            </Box>
          </GradientBox>
          <GradientBox>
            <Box>Total $IC Staked</Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px">
              <ValueBox>
                {(totalLocked / Math.pow(10, 18)).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 3,
                })}
              </ValueBox>
              <SymbolBox>$IC</SymbolBox>
            </Box>
          </GradientBox>
        </Box>
        <ConnectButton onClick={() => (!account ? connectWallet() : disconnectWallet())}>
          <GradientText size={20} weight={700}>
            {!account ? "Connect Wallet" : getAccountString(account)}
          </GradientText>
        </ConnectButton>
      </RowContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled(Box)`
  position: relative;
  width: 100%;
  padding: 20px 50px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  line-height: 120%;
  color: black;
  z-index: 10;
`;

const RowContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const GLink = styled(Box)`
  margin: 20px 0 0 0 !important;
  padding-right: 55px;
  text-decoration: none !important;
  color: black !important;
  @media screen and (max-width: 500px) {
    padding-right: 20px;
  }
`;

const ConnectButton = styled(Box)`
  position: relative;
  cursor: pointer;
  background: #222221;
  border-radius: 10px;
  padding: 16px 12px;
  :before {
    content: "";
    position: absolute;
    left: -1px;
    top: -1px;
    border-radius: 10px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    z-index: -1;
    background: linear-gradient(to right, #f4848a, #1888a3);
  }
`;

const GradientBox = styled(Box)`
  background: linear-gradient(85.51deg, #e5868e 1.69%, #1e88a3 96.4%);
  border-radius: 12.42px;
  height: 93px;
  width: 279px;
  display: flex;
  flex-direction: column;
  padding: 18px 50px 18px 27px;
  > div:first-child {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 13px;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const ValueBox = styled(Box)`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 13px;
  /* identical to box height, or 55% */

  color: #242525;
`;

const SymbolBox = styled(Box)`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 13px;
`;
export default Topbar;
