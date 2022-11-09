import { ethers } from "ethers";
import { INVISI_ADDR, STAKING_ADDR, MULTICALL_ADDR } from "../abis/address";
import ERC20ABI from "../abis/ERC20ABI.json";
import STAKINGABI from "../abis/STAKINGABI.json";
import MultiCallABI from "../abis/MultiCallABI.json";

export const RPC_ENDPOINT = {
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  5: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
};

export const getContract = (abi, address, chainID, signer) => {
  const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT[chainID]);
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getTokenContract = (chainID, signer) => {
  return getContract(ERC20ABI, INVISI_ADDR, chainID, signer);
};

export const getStakingContract = (chainID, signer) => {
  return getContract(STAKINGABI, STAKING_ADDR, chainID, signer);
};

export const getMulticallContract = (chainID, signer) => {
  return getContract(MultiCallABI, MULTICALL_ADDR, chainID, signer);
};


export const multicall = async (abi, calls, chainID) => {
  try {
    const itf = new ethers.utils.Interface(abi);
    const multi = getMulticallContract(chainID);
    const calldata = calls.map((call) => [
      call.address.toLowerCase(),
      itf.encodeFunctionData(call.name, call.params),
    ]);

    const { returnData } = await multi.aggregate(calldata);
    const res = returnData.map((call, i) =>
      itf.decodeFunctionResult(calls[i].name, call)
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};