/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./menu.css";
import { Box, useMediaQuery } from "@mui/material";
import styled from "styled-components";

import { useAddress, useWeb3Context } from "../../hooks/web3Context";
import useLockInfo from "../../hooks/useLockInfo";
import GradientText from "../GradientText";

const Hamburger = ({ page, setPage }) => {
  const menuRef = useRef(null);

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
  ];

  const externalMenus = [
    {
      icon: "/icons/docs.svg",
      text: "Docs",
      pathName: "https://invisicash.gitbook.io/",
    },
    {
      icon: "/icons/community.svg",
      text: "Community",
      pathName: "https://t.me/InvisiCash",
    },
  ];

  const { connect, disconnect } = useWeb3Context();
  const account = useAddress();

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
    document.addEventListener("mouseup", function (event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        let form = document.getElementById("check");
        if (form) form.checked = false;
      }
    });
  }, []);

  const sm = useMediaQuery("(max-height : 490px)");
  return (
    <nav role="navigation" style={{ zIndex: "1" }}>
      <div id="menuToggle" ref={menuRef}>
        {/* A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it. */}

        <input type="checkbox" id="check" />

        {/* Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff. */}

        <span></span>
        <span></span>
        <span></span>

        {/* Too bad the menu has to be inside of the button but hey, it's pure CSS magic. */}

        <Menu id="menu">
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"} zIndex={15} mt={"30px"} ml={"24px"}>
            <Logo>
              <img src="/images/logo.png"></img>
            </Logo>
          </Box>
          <ItemPanel mx={"20px"} mt={"52px"} active={page + 1}>
            {menus.map((data, i) => {
              return (
                <Link
                  to={`/${data.text.replace(" ", "").toLowerCase()}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    setPage(i);
                    let form = document.getElementById("check");
                    if (form) form.checked = false;
                  }}
                >
                  <Item>
                    {/*<Icon zIndex={10} ml={i === 4 ? "10px" : 0}>
                      <img src={`/icons/${data.url}`} />
                    </Icon>*/}
                    <Box ml={i === 111 ? "-10px" : 0} color={"black"} fontSize={"23px"} fontFamily={"Inter"} zIndex={10}>
                      {data.text}
                    </Box>
                  </Item>
                </Link>
              );
            })}
            {externalMenus.map((data, i) => {
              return (
                <a
                  href={data.pathName}
                  target={"_blank"}
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    let form = document.getElementById("check");
                    if (form) form.checked = false;
                  }}
                >
                  <Item>
                    {/*<Icon zIndex={10} ml={i === 4 ? "10px" : 0}>
                      <img src={`/icons/${data.url}`} />
                    </Icon>*/}
                    <Box ml={i === 111 ? "-10px" : 0} color={"black"} fontSize={"23px"} fontFamily={"Inter"} zIndex={10}>
                      {data.text}
                    </Box>
                  </Item>
                </a>
              );
            })}

            <ConnectButton
              onClick={() => {
                let form = document.getElementById("check");
                if (form) form.checked = false;
                if (account) disconnectWallet();
                else connectWallet();
              }}
            >
              {!account ? "Connect Wallet" : getAccountString(account)}
            </ConnectButton>
          </ItemPanel>
        </Menu>
      </div>
    </nav>
  );
};

const ItemPanel = styled(Box)`
  > a:nth-child(${({ active }) => active}) > div > div {
    color: #fff;
  }
`;

const LeftBox = styled(Box)`
  padding: 35px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const ExternalMenuItem = styled.a`
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

const Logo = styled(Box)`
  margin-right: 55px;
  padding: 25px;
  width: 58px;
  height: 58px;
  @media screen and (max-width: 500px) {
    margin-right: 20px;
  }
`;
const ConnectButton = styled(Box)`
  padding: 10px 24px;
  width: fit-content;
  height: 63px;
  border: 1px solid #30252f;
  border-radius: 27px;
  margin-left: 58px;

  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome, Edge, Opera and Firefox */

  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: rgba(43, 113, 255, 0.1);
  color: rgba(43, 113, 255, 1);
  :hover:not(:disabled) {
    background-color: rgb(75, 198, 139);
    color: white;
  }
  transition: all 0.5s ease-out;
`;

const Item = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 12px 0 12px 58px;
  width: 100%;
  border: 1px solid transparent;
  :hover:not(:disabled) {
    /* border: 1px solid black; */
    > div {
      color: #d2d2d2;
    }
  }
  text-align: center;
  transiton: all 0.5s ease-out;
  @media screen and (max-height: 780px) {
    margin-bottom: 20px;
  }
`;

const Icon = styled(Box)`
  width: 40px;
  display: flex;
  justify-content: center;
  > img {
    cursor: pointer;
  }
  margin-right: 50px;
`;

const Menu = styled.ul`
  position: relative;
`;
export default Hamburger;
