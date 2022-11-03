/* eslint-disable jsx-a11y/alt-text */
import { Box, Link, useMediaQuery } from "@mui/material";
import { style } from "@mui/system";
import styled from "styled-components";
import GradientText from "../../components/GradientText";

function LiquidityStaking() {
  const sm = useMediaQuery("(max-width : 710px)");

  return (
    <StyledContainer>
      <StakingBox>
        <StakingTitle>
          <Box display="flex" flexDirection="column">
            <GradientText family="Montserrat">$IC</GradientText>
            <MinStaking>Min. Stake 5,000 IC</MinStaking>
          </Box>
          <img src="/images/lock.png" />
        </StakingTitle>
        <StakingBody>
          <StakingApy>
            <ApyDesc>
              <Box color="#D2D2D2">APY:</Box>
              <GradientText size={16} weight={400}>
                IC Earned
              </GradientText>
            </ApyDesc>
            <ApyBox>X%</ApyBox>
          </StakingApy>
          <StakingResult>
            <Box display="flex" gap="4px" flexDirection="column">
              <Box color="#D2D2D2" fontWeight="500" fontSize="24px" fontFamily="Montserrat">
                582,278,591
              </Box>
              <Box color="#D2D2D2" fontFamily="Montserrat">
                -55 USD
              </Box>
              <GradientText size={16} weight={400}>
                Stake IC
              </GradientText>
            </Box>
            <MaxBtn onClick={() => console.log("Max clicked!")}>
              <GradientText size={16} weight={700}>
                MAX
              </GradientText>
            </MaxBtn>
          </StakingResult>
          <StakingBtn>Enable</StakingBtn>
        </StakingBody>
      </StakingBox>
      <StakingBox>
        <StakingTitle>
          <Box display="flex" flexDirection="column">
            <GradientText family="Montserrat">$IC/ETH LP</GradientText>
            <MinStaking>Min. Stake 0.001 LP</MinStaking>
          </Box>
          <img src="/images/lock.png" />
        </StakingTitle>
        <StakingBody>
          <StakingApy>
            <ApyDesc>
              <Box color="#D2D2D2">APY:</Box>
              <GradientText size={16} weight={400}>
                IC Earned
              </GradientText>
            </ApyDesc>
            <ApyBox>X%</ApyBox>
          </StakingApy>
          <StakingResult>
            <Box display="flex" gap="4px" flexDirection="column">
              <Box color="#D2D2D2" fontWeight="500" fontSize="24px" fontFamily="Montserrat">
                0.0054 LP
              </Box>
              <Box color="#D2D2D2" fontFamily="Montserrat">
                -456 USD
              </Box>
              <GradientText size={16} weight={400}>
                Stake IC/ETH
              </GradientText>
            </Box>
            <MaxBtn onClick={() => console.log("Max clicked!")}>
              <GradientText size={16} weight={700}>
                MAX
              </GradientText>
            </MaxBtn>
          </StakingResult>
          <StakingBtn>Enable</StakingBtn>
        </StakingBody>
      </StakingBox>
      <StakingBox>
        <StakingTitle>
          <Box display="flex" flexDirection="column">
            <GradientText family="Montserrat">$IC</GradientText>
            <MinStaking>Min. Stake 5,000 IC</MinStaking>
          </Box>
          <img src="/images/lock.png" />
        </StakingTitle>
        <StakingBody>
          <StakingApy>
            <ApyDesc>
              <Box color="#D2D2D2">APY:</Box>
              <GradientText size={16} weight={400}>
                IC Earned
              </GradientText>
            </ApyDesc>
            <ApyBox>X%</ApyBox>
          </StakingApy>
          <StakingResult>
            <Box display="flex" gap="4px" flexDirection="column">
              <Box color="#D2D2D2" fontWeight="500" fontSize="24px" fontFamily="Montserrat">
                582,278,591
              </Box>
              <Box color="#D2D2D2" fontFamily="Montserrat">
                -55 USD
              </Box>
              <GradientText size={16} weight={400}>
                Stake IC
              </GradientText>
            </Box>
            <MaxBtn onClick={() => console.log("Max clicked!")}>
              <GradientText size={16} weight={700}>
                MAX
              </GradientText>
            </MaxBtn>
          </StakingResult>
          <StakingBtn>Enable</StakingBtn>
        </StakingBody>
      </StakingBox>
    </StyledContainer>
  );
}

const StyledContainer = styled(Box)`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 100px 48px 150px 48px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StakingBox = styled(Box)`
  background: rgba(31, 31, 31, 0.69);
  border: 1px solid #505050;
  backdrop-filter: blur(2px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 10px;
  width: 375px;
  /* height: 384px; */
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const StakingTitle = styled(Box)`
  padding: 20px 25px 10px 30px;
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
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
`;

const StakingBtn = styled(Box)`
  margin-top: 40px;
  background: linear-gradient(90deg, #de868f 0%, #2388a3 100%);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height */

  text-align: center;

  /* #FFFFFF */
  color: #ffffff;
  width: 327px;
  height: 56px;
  cursor: pointer;
`;

const StakingApy = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ApyBox = styled(Box)`
  background: radial-gradient(100% 732.18% at 0% 50%, rgba(217, 134, 144, 0.24) 0%, rgba(41, 136, 163, 0.24) 100%);
  border-radius: 10px;
  width: 92px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  color: #ffffff;
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

const MaxBtn = styled(Box)`
  position: relative;
  cursor: pointer;
  background: #222221;
  border-radius: 10px;
  padding: 20px 60px;
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
export default LiquidityStaking;
