import { ethers } from "ethers";
import { HIKARI_ADDR } from "../abis/address";
import ERC20ABI from "../abis/ERC20ABI.json";
import HIKARIABI from "../abis/HIKARIABI.json";

export const RPC_ENDPOINT = {
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  5: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
};

export const getContract = (abi, address, chainID, signer) => {
  const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT[chainID]);
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getTokenContract = (address, chainID, signer) => {
  return getContract(ERC20ABI, address, chainID, signer);
};
export const getHikariContract = (chainID, signer) => {
  return getContract(HIKARIABI, HIKARI_ADDR, chainID, signer);
};
