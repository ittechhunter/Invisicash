/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Box, Link, useMediaQuery } from "@mui/material";
import { style } from "@mui/system";
import styled from "styled-components";
import GradientText from "../../components/GradientText";

function VestedStaking() {
  const sm = useMediaQuery("(max-width : 710px)");
  const [mode, setMode] = useState(0);
  const [apy, setApy] = useState(0);

  return (
    <StyledContainer>
      <StakingBox>
        <StakingTitle>
          <Box display="flex" flexDirection="column">
            <GradientText family="Montserrat" weight={500} size={40}>
              Locked $IC Pool
            </GradientText>
          </Box>
          <img src="/images/lock.png" />
        </StakingTitle>
        <StakingBody>
          <Box display="flex" justifyContent="space-between" gap="35px">
            <GradientBtn padding="20px" active={(mode === 0).toString()} onClick={() => setMode(0)}>
              <GradientText size={23} weight={700} family={"Montserrat"}>
                $IC
              </GradientText>
              <ModeBox>Single Sided Staking</ModeBox>
            </GradientBtn>
            <GradientBtn padding="20px" active={(mode === 1).toString()} onClick={() => setMode(1)}>
              <GradientText size={23} weight={700} family={"Montserrat"}>
                $IC/USDC
              </GradientText>
              <ModeBox>$IC Liquidity Staking</ModeBox>
            </GradientBtn>
          </Box>
          <Box marginTop={"30px"} fontFamily="Montserrat" fontWeight={700} fontSize="16px" lineHeight="20px" color="#D2D2D2">
            Lockup Length
          </Box>
          <Box display="flex" justifyContent="space-between" gap="8px" marginTop="12px">
            <GradientThinBtn paddingTop="12px" paddingBottom="18px" active={(apy === 0).toString()} onClick={() => setApy(0)}>
              <ApyBox>14 days</ApyBox>
              <GradientText size={20} weight={700} family={"Montserrat"}>
                10% APR
              </GradientText>
            </GradientThinBtn>
            <GradientThinBtn paddingTop="12px" paddingBottom="18px" active={(apy === 1).toString()} onClick={() => setApy(1)}>
              <ApyBox>30 days</ApyBox>
              <GradientText size={20} weight={700} family={"Montserrat"}>
                15% APR
              </GradientText>
            </GradientThinBtn>
            <GradientThinBtn paddingTop="12px" paddingBottom="18px" active={(apy === 2).toString()} onClick={() => setApy(2)}>
              <ApyBox>60 days</ApyBox>
              <GradientText size={20} weight={700} family={"Montserrat"}>
                18% APR
              </GradientText>
            </GradientThinBtn>
            <GradientThinBtn paddingTop="12px" paddingBottom="18px" active={(apy === 3).toString()} onClick={() => setApy(3)}>
              <ApyBox>90 days</ApyBox>
              <GradientText size={20} weight={700} family={"Montserrat"}>
                25% APR
              </GradientText>
            </GradientThinBtn>
          </Box>
          <InputBox>
            <ICInput />
            <Box fontFamily="Montserrat" fontWeight={600} fontSize="16px" lineHeight="20px" color="#fff">
              $IC
            </Box>
          </InputBox>
          <StakingBtn>ZAP</StakingBtn>
        </StakingBody>
      </StakingBox>
    </StyledContainer>
  );
}

const StyledContainer = styled(Box)`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 48px 200px 150px 0px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StakingBox = styled(Box)`
  width: 577.15px;

  background: #212121;
  border: 1px solid #505050;
  backdrop-filter: blur(2px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 10px;
  /* height: 384px; */
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const StakingTitle = styled(Box)`
  padding: 40px 30px 20px 30px;
  border-bottom: 1px solid #505050;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MinStaking = styled(Box)`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  color: #d2d2d2;
`;

const StakingBody = styled(Box)`
  padding: 40px 40px 25px 40px;
  display: flex;
  flex-direction: column;
`;

const StakingBtn = styled(Box)`
  margin-top: 20px;
  background: linear-gradient(90deg, #de868f 0%, #2388a3 100%);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  text-align: center;

  /* #FFFFFF */

  color: #ffffff;
  padding: 30px 200px;
  cursor: pointer;
`;

const StakingApy = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ApyBox = styled(Box)`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-align: center;

  color: #fff;
`;

const ApyDesc = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StakingResult = styled(Box)`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GradientBtn = styled(Box)`
  position: relative;
  cursor: pointer;
  background: #2d2c2b;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  :before {
    content: "";
    position: absolute;
    left: -2.5px;
    top: -2.5px;
    border-radius: 10px;
    width: calc(100% + 5px);
    height: calc(100% + 5px);
    z-index: -1;
    background: ${({ active }) => (active === "true" ? "linear-gradient(to right, #f4848a, #1888a3)" : "#2D2C2B")};
  }
`;

const GradientThinBtn = styled(Box)`
  position: relative;
  cursor: pointer;
  background: #2d2c2b;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  :before {
    content: "";
    position: absolute;
    left: -1.5px;
    top: -1.5px;
    border-radius: 10px;
    width: calc(100% + 3px);
    height: calc(100% + 3px);
    z-index: -1;
    background: ${({ active }) => (active === "true" ? "linear-gradient(to right, #f4848a, #1888a3)" : "#2D2C2B")};
  }
`;

const ModeBox = styled(Box)`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  color: #d2d2d2;
`;

const ICInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: #fff;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

const InputBox = styled(Box)`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid #505050;
  border-radius: 10px;
  padding: 15px 10px;
  height: 50px;
  width: 450px;
  margin: auto;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default VestedStaking;
