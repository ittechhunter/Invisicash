/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Box, Link, Skeleton, useMediaQuery, CircularProgress } from "@mui/material";
import { style } from "@mui/system";
import styled from "styled-components";
import GradientText from "../../components/GradientText";
import { useWeb3Context, useAddress } from "../../hooks/web3Context";
import useLockInfo from "../../hooks/useLockInfo";
import { STAKING_ADDR } from "../../abis/address";
import { getTokenContract, getStakingContract } from "../../utils/contracts";

import { ethers } from "ethers";
function VestedStaking() {
  const sm = useMediaQuery("(max-width : 710px)");
  const [mode, setMode] = useState(0);
  const [apy, setApy] = useState(0);

  const [pending, setPending] = useState(false);
  const [maxpressed, setMaxPressed] = useState(false);
  const [isModal, setModal] = useState(false);
  const [type, setType] = useState(false);
  const [value, setValue] = useState(0);
  const [insufficient, setInsufficient] = useState(false);

  const { balance, lockinfo, unlockallow, accountlockinfo, fetchLockData, fetchAccountLockData, fetchAllowance, fetchTotalLocked } = useLockInfo();
  const { connect, provider, chainID } = useWeb3Context();

  const account = useAddress();

  useEffect(() => {
    if (value > balance / Math.pow(10, 18) && !maxpressed && !type) setInsufficient(true);
    else if (value > accountlockinfo[apy + 1].available / Math.pow(10, 18) && !maxpressed && type) setInsufficient(true);
    else setInsufficient(false);
  }, [value, maxpressed]);

  const onMax = () => {
    setMaxPressed(true);
    if (!type) setValue(balance / Math.pow(10, 18));
    else setValue(accountlockinfo[apy + 1].available / Math.pow(10, 18));
  };

  const onConfirm = async (i) => {
    setPending(true);
    try {
      let ttx, estimateGas;
      const stakingContract = getStakingContract(chainID, provider.getSigner());
      if (type === false) {
        estimateGas = await stakingContract.estimateGas.deposit(maxpressed ? balance : ethers.utils.parseEther(value), i);
        if (estimateGas / 1 === 0) {
          console.log({
            type: "error",
            title: "Error",
            detail: "Insufficient funds",
          });
          setPending(false);
          setModal(false);
          return;
        }
        const tx = {
          gasLimit: estimateGas.toString(),
        };
        ttx = await stakingContract.deposit(maxpressed ? balance : ethers.utils.parseEther(value), i, tx);
      } else {
        estimateGas = await stakingContract.estimateGas.withdraw(maxpressed ? accountlockinfo[apy + 1].available : ethers.utils.parseEther(value), i);
        if (estimateGas / 1 === 0) {
          console.log({
            type: "error",
            title: "Error",
            detail: "Insufficient funds",
          });
          setPending(false);
          setModal(false);
          return;
        }
        const tx = {
          gasLimit: Math.ceil(estimateGas * 1.2),
        };
        ttx = await stakingContract.withdraw(maxpressed ? accountlockinfo[apy + 1].available : ethers.utils.parseEther(value), i, tx);
      }
      await ttx.wait();
      fetchAccountLockData();
      fetchLockData();
      fetchTotalLocked();
    } catch (error) {
      console.log(error);
    }
    setModal(false);
    setPending(false);
  };

  const onApproveContract = async (address) => {
    setPending(true);
    try {
      const tokenContract = getTokenContract(chainID, provider.getSigner());
      const estimateGas = await tokenContract.estimateGas.approve(STAKING_ADDR, "115792089237316195423570985008687907853269984665640564039457584007913129639935");
      if (estimateGas / 1 === 0) {
        console.log({
          type: "error",
          title: "Error",
          detail: "Insufficient funds",
        });
        setPending(false);
        return;
      }
      const tx = {
        gasLimit: estimateGas.toString(),
      };
      const approvetx = await tokenContract.approve(STAKING_ADDR, "115792089237316195423570985008687907853269984665640564039457584007913129639935", tx);
      await approvetx.wait();
      fetchAllowance();
    } catch (error) {
      console.log(error);
      // figureError(error, console.log);
    }
    setPending(false);
  };

  const onClaim = async (i) => {
    setPending(true);
    try {
      const stakingContract = getStakingContract(chainID, provider.getSigner());
      const estimateGas = await stakingContract.estimateGas.claimReward(i);
      if (estimateGas / 1 === 0) {
        console.log({
          type: "error",
          title: "Error",
          detail: "Insufficient funds",
        });
        setPending(false);
        return;
      }
      const tx = {
        gasLimit: Math.ceil(estimateGas * 1.2),
      };

      const harvestTx = await stakingContract.claimReward(i, tx);
      await harvestTx.wait();
      fetchAccountLockData();
      fetchLockData();
    } catch (error) {
      console.log(error);
      // figureError(error, setNotification);
    }
    setPending(false);
  };

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
          {/* <Box display="flex" justifyContent="space-between" gap="35px">
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
          </Box> */}
          <Box fontFamily="Montserrat" fontWeight={700} fontSize="16px" lineHeight="20px" color="#D2D2D2">
            Lockup Length
          </Box>
          <Box display="flex" justifyContent="space-between" gap="8px" marginTop="12px">
            <GradientThinBtn paddingTop="12px" paddingBottom="18px" active={(apy === 0).toString()} onClick={() => setApy(0)}>
              <ApyBox>14 days</ApyBox>
              <GradientText size={20} weight={700} family={"Montserrat"}>
                44% APR
              </GradientText>
            </GradientThinBtn>
            <GradientThinBtn paddingTop="12px" paddingBottom="18px" active={(apy === 1).toString()} onClick={() => setApy(1)}>
              <ApyBox>30 days</ApyBox>
              <GradientText size={20} weight={700} family={"Montserrat"}>
                48% APR
              </GradientText>
            </GradientThinBtn>
            <GradientThinBtn paddingTop="12px" paddingBottom="18px" active={(apy === 2).toString()} onClick={() => setApy(2)}>
              <ApyBox>60 days</ApyBox>
              <GradientText size={20} weight={700} family={"Montserrat"}>
                52% APR
              </GradientText>
            </GradientThinBtn>
            <GradientThinBtn paddingTop="12px" paddingBottom="18px" active={(apy === 3).toString()} onClick={() => setApy(3)}>
              <ApyBox>90 days</ApyBox>
              <GradientText size={20} weight={700} family={"Montserrat"}>
                56% APR
              </GradientText>
            </GradientThinBtn>
          </Box>
          <StakingResult>
            <Box display="flex" gap="4px" flexDirection="column">
              <GradientText size={16} weight={400}>
                Staked IC
              </GradientText>
              <Box color="#D2D2D2" fontWeight="500" fontSize="24px" fontFamily="Montserrat">
                {account ? (
                  accountlockinfo[apy + 1].stakedAmount !== undefined ? (
                    Number(accountlockinfo[apy + 1].stakedAmount / Math.pow(10, 18)).toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 3,
                    })
                  ) : (
                    <Skeleton variant={"text"} width={"120px"} style={{ transform: "unset" }} />
                  )
                ) : (
                  0.0
                )}
              </Box>
            </Box>
            <Box display="flex" gap="4px" flexDirection="column">
              <GradientText size={16} weight={400}>
                Locked IC
              </GradientText>
              <Box color="#D2D2D2" fontWeight="500" fontSize="24px" fontFamily="Montserrat">
                {account ? (
                  accountlockinfo[apy + 1].locked !== undefined ? (
                    Number(accountlockinfo[apy + 1].locked / Math.pow(10, 18)).toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 3,
                    })
                  ) : (
                    <Skeleton variant={"text"} width={"120px"} style={{ transform: "unset" }} />
                  )
                ) : (
                  0.0
                )}
              </Box>
            </Box>
            <Box display="flex" gap="4px" flexDirection="column">
              <GradientText size={16} weight={400}>
                Available IC
              </GradientText>
              <Box color="#D2D2D2" fontWeight="500" fontSize="24px" fontFamily="Montserrat">
                {account ? (
                  accountlockinfo[apy + 1].available !== undefined ? (
                    Number(accountlockinfo[apy + 1].available / Math.pow(10, 18)).toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 3,
                    })
                  ) : (
                    <Skeleton variant={"text"} width={"120px"} style={{ transform: "unset" }} />
                  )
                ) : (
                  0.0
                )}
              </Box>
            </Box>
          </StakingResult>
          <StakingResult>
            <Box display="flex" gap="4px" flexDirection="column">
              <GradientText size={16} weight={400}>
                Earned IC
              </GradientText>
              <Box color="#D2D2D2" fontWeight="500" fontSize="24px" fontFamily="Montserrat">
                {account ? (
                  accountlockinfo[apy + 1].pendingReward !== undefined ? (
                    Number(accountlockinfo[apy + 1].pendingReward / Math.pow(10, 18)).toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 3,
                    })
                  ) : (
                    <Skeleton variant={"text"} width={"120px"} style={{ transform: "unset" }} />
                  )
                ) : (
                  0.0
                )}
              </Box>
              <Box color="#D2D2D2" fontFamily="Montserrat">
                {account ? (
                  accountlockinfo[apy + 1].pendingReward !== undefined ? (
                    Number(accountlockinfo[apy + 1].pendingReward / Math.pow(10, 18)).toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 3,
                    })
                  ) : (
                    <Skeleton variant={"text"} width={"120px"} style={{ transform: "unset" }} />
                  )
                ) : (
                  "0.0 USD"
                )}
              </Box>
            </Box>
            <ClaimBtn disabled={!accountlockinfo[apy + 1].pendingReward} onClick={() => accountlockinfo[apy + 1].pendingReward && onClaim(apy + 1)}>
              <GradientText size={16} weight={700}>
                Claim
              </GradientText>
            </ClaimBtn>
          </StakingResult>
          {/* <InputBox>
            <ICInput />
            <Box fontFamily="Montserrat" fontWeight={600} fontSize="16px" lineHeight="20px" color="#fff">
              $IC
            </Box>
          </InputBox> */}
          {!unlockallow ? (
            <StakingBtn
              onClick={() => {
                !account ? connect() : onApproveContract();
              }}
            >
              {!account ? "Connect Wallet" : "Enable"}
            </StakingBtn>
          ) : (
            <Box display="flex" justifyContent="space-between" gap="12px">
              <StakingBtn
                onClick={() => {
                  setModal(true);
                  setType(false);
                  setValue(0);
                }}
              >
                Deposit
              </StakingBtn>
              <StakingBtn
                onClick={() => {
                  setModal(true);
                  setType(true);
                  setValue(0);
                }}
              >
                Withdraw
              </StakingBtn>
            </Box>
          )}
        </StakingBody>
      </StakingBox>
      {isModal && (
        <>
          <ModalBack onClick={() => !pending && setModal(false)}></ModalBack>
          <Modal>
            <ModalClose onClick={() => !pending && setModal(false)}>
              <img src="./images/close.png" />
            </ModalClose>
            <GradientText size={32} weight={500}>
              {!type ? "Deposit Tokens" : "Withdraw Tokens"}
            </GradientText>
            <InputBox>
              <ICInput
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setMaxPressed(false);
                }}
              />
              <Box fontFamily="Montserrat" fontWeight={600} fontSize="16px" lineHeight="20px" color="#fff">
                $IC
              </Box>
            </InputBox>
            {type && (
              <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="24px" width="100%">
                <Box>
                  <GradientText size={16} weight={400}>
                    IC Staked: {accountlockinfo[apy + 1].stakedAmount / Math.pow(10, 18)}
                  </GradientText>
                </Box>
                <Box>
                  <GradientText size={16} weight={400}>
                    IC Locked: {accountlockinfo[apy + 1].locked / Math.pow(10, 18)}
                  </GradientText>
                </Box>
              </Box>
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="24px" width="100%">
              <Box>
                <GradientText size={16} weight={400}>
                  {!type ? `IC Avaiable: ${balance / Math.pow(10, 18)}` : `IC Avaiable: ${accountlockinfo[apy + 1].available / Math.pow(10, 18)}`}
                </GradientText>
              </Box>
              <ClaimBtn paddingX={1} paddingY={0.5} onClick={() => onMax()}>
                <GradientText size={16} weight={700}>
                  Max
                </GradientText>
              </ClaimBtn>
            </Box>
            <StakingBtn
              width="100%"
              onClick={() => {
                if (!(insufficient || pending || !(value / 1))) {
                  setModal(true);
                  onConfirm(apy + 1);
                }
              }}
              disabled={insufficient || pending || !(value / 1)}
            >
              {pending ? <CircularProgress color="error" size="32px" /> : "Confirm"}
            </StakingBtn>
          </Modal>
        </>
      )}
    </StyledContainer>
  );
}

const ModalBack = styled(Box)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(12px);
  z-index: 101;
`;

const ModalClose = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const Modal = styled(Box)`
  z-index: 102;
  position: fixed;
  width: 420px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(31, 31, 31, 0.69);
  border: 1px solid #505050;
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 10px;
  padding: 24px 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height */
  width: 100%;
  text-align: center;

  /* #FFFFFF */
  color: #ffffff;
  height: 72px;
  cursor: ${({ disabled }) => (disabled === true ? "not-allowed" : "pointer")};
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
  width: 100%;
  margin: auto;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClaimBtn = styled(Box)`
  position: relative;
  background: #222221;
  border-radius: 10px;
  padding: 15px 30px;
  cursor: ${({ disabled }) => (disabled === true ? "not-allowed" : "pointer")};

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
export default VestedStaking;
