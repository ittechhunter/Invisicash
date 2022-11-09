/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { INVISI_ADDR, STAKING_ADDR } from "../abis/address";
import ERC20ABI from "../abis/ERC20ABI.json";
import STAKINGABI from "../abis/STAKINGABI.json";
import { useAddress, useWeb3Context } from "./web3Context";
import { getStakingContract, getTokenContract, multicall } from "../utils/contracts";

const defaultVal = {
  balance: 0,
  totalLocked: 0,
  lockinfo: [{}, {}, {}, {}, {}],
  unlockallow: false,
  accountlockinfo: [{}, {}, {}, {}, {}],
  fetchLockData: () => {},
  fetchAccountLockData: () => {},
  fetchAllowance: () => {},
};

export const LockInfoContext = React.createContext(defaultVal);

export default function useLockInfo() {
  return React.useContext(LockInfoContext);
}
let timerid = null,
  lockid = null;
export function LockInfoProvider({ children }) {
  const account = useAddress();
  const [lockinfo, setLockInfo] = useState([{}, {}, {}, {}, {}]);
  const [accountlockinfo, setAccountLockInfo] = useState([{}, {}, {}, {}, {}]);
  const [unlockallow, setUnLockAllow] = useState(false);
  const [balance, setBalance] = useState(0);
  const [totalLocked, setTotalLocked] = useState(0);

  const { chainID } = useWeb3Context();

  async function fetchBalance() {
    try {
      const tokenContract = getTokenContract(chainID);
      tokenContract
        .balanceOf(account)
        .then((data) => {
          setBalance(data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTotalLocked() {
    try {
      const stakingContract = getStakingContract(chainID);
      stakingContract
        .totalStaked()
        .then((data) => {
          setTotalLocked(data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLockData() {
    try {
      let calls = [];

      for (let i = 0; i < 5; i++)
        calls.push({
          address: STAKING_ADDR,
          name: "lockups",
          params: [i],
        });

      const result = await multicall(STAKINGABI, calls, chainID);
      let temp = [];
      for (let i = 0; i < 5; i++) {
        temp.push({
          duration: result[i].duration / 1,
          totalStaked: result[i].totalStaked / Math.pow(10, 18),
        });
      }
      setLockInfo(temp);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAccountLockData() {
    try {
      let calls = [];
      for (let i = 0; i < 5; i++) {
        calls.push({
          address: STAKING_ADDR,
          name: "pendingReward",
          params: [account, i],
        });
        calls.push({
          address: STAKING_ADDR,
          name: "userInfo",
          params: [i, account],
        });
      }
      const result = await multicall(STAKINGABI, calls, chainID);
      let temp = [];
      for (let i = 0; i < 5; i++)
        temp.push({
          pendingReward: result[i * 2][0] / Math.pow(10, 18),
          stakedAmount: result[i * 2 + 1][0],
          available: result[i * 2 + 1][1],
          locked: result[i * 2 + 1][2],
        });
      setAccountLockInfo(temp);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAllowance() {
    try {
      let calls = [
        {
          name: "allowance",
          address: INVISI_ADDR,
          params: [account, STAKING_ADDR],
        },
      ];
      const result = await multicall(ERC20ABI, calls, chainID);
      setUnLockAllow(result[0][0] > ethers.utils.parseEther("10000"));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!(chainID === 1 || chainID === 5)) return;
    fetchLockData();
    if (lockid) clearInterval(lockid);
    lockid = setInterval(() => {
      fetchLockData();
    }, 20000);
  }, [chainID]);

  useEffect(() => {
    if (!account || !(chainID === 1 || chainID === 5)) return;
    fetchAccountLockData();
    fetchAllowance();
    fetchBalance();
    fetchTotalLocked();
    if (timerid) clearInterval(timerid);
    timerid = setInterval(() => {
      fetchAccountLockData();
      fetchAllowance();
      fetchBalance();
      fetchTotalLocked();
    }, 20000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainID]);

  return (
    <LockInfoContext.Provider
      value={{
        balance,
        totalLocked,
        lockinfo: [lockinfo[0], lockinfo[1], lockinfo[2], lockinfo[3], lockinfo[4]],
        unlockallow,
        accountlockinfo: [accountlockinfo[0], accountlockinfo[1], accountlockinfo[2], accountlockinfo[3], accountlockinfo[4]],
        fetchLockData,
        fetchAccountLockData,
        fetchAllowance,
        fetchBalance,
        fetchTotalLocked,
      }}
      children={children}
    />
  );
}
