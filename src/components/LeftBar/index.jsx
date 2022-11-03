import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const LeftBar = ({ page, setPage }) => {
  const menus = [
    {
      icon: "/icons/deposit.svg",
      text: "Deposit",
    },
    {
      icon: "/icons/liquidity.svg",
      text: "Liquidity Staking",
    },
    {
      icon: "/icons/vested.svg",
      text: "Vested Staking",
    },
    {
      icon: "/icons/docs.svg",
      text: "Docs",
    },
    {
      icon: "/icons/community.svg",
      text: "Community",
    },
  ];
  return (
    <>
      <LeftBox>
        {menus.map((item, i) => {
          return (
            <MenuItem to={`/${item.text.replace(" ", "").toLowerCase()}`} onClick={() => setPage(i)} active={(page === i).toString()} key={i}>
              <img src={item.icon} />
              {item.text}
            </MenuItem>
          );
        })}
      </LeftBox>
    </>
  );
};

const LeftBox = styled(Box)`
  padding: 35px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100vh - 133px);
`;

const MenuItem = styled(Link)`
  border-radius: 12.42px;
  height: 45.54px;
  width: 207px;
  display: flex;
  align-items: center;
  text-decoration: none;
  background: ${({ active }) => (active === "true" ? "linear-gradient(273.78deg, #1E88A3 8.84%, #FA868B 105.18%)" : "#202020")};
  color: ${({ active }) => (active === "true" ? "#fff" : "rgba(255, 255, 255, 0.5)")};
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 13px;
  :hover {
    color: white;
    > img {
      opacity: 1;
    }
  }
  > img {
    margin-left: 20px;
    margin-right: 20px;
    opacity: ${({ active }) => (active === "true" ? 1 : 0.5)};
  }
`;

export default LeftBar;
