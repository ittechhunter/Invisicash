import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import CommingSoon from "./pages/CommingSoon";
import LiquidityStaking from "./pages/LiquidityStaking";
import VestedStaking from "./pages/VestedStaking";
import "./App.css";
import TopBar from "./components/Topbar";
import LeftBar from "./components/LeftBar";
import BottomBar from "./components/BottomBar";

import styled from "styled-components";

function App() {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const url = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);
    console.log(url);
    if (url === "deposit") setPage(0);
    else if (url === "liquiditystaking") setPage(1);
    else if (url === "vestedstaking") setPage(2);
  }, []);

  return (
    <BrowserRouter>
      <TopBar page={page} setPage={setPage} />
      <Box display="flex" width="100%">
        <LeftBar page={page} setPage={setPage} />
        <Panel>
          <Routes>
            <Route exact path="/" element={<Navigate to={"/deposit"} />} />
            <Route exact path={"/deposit"} element={<CommingSoon />} />
            <Route exact path={"/liquiditystaking"} element={<LiquidityStaking />} />
            <Route exact path={"/vestedstaking"} element={<VestedStaking />} />
            <Route exact path={"/docs"} element={<CommingSoon />} />
            <Route exact path={"/community"} element={<CommingSoon />} />
          </Routes>
        </Panel>
      </Box>
      <BottomBar />
      {/* <LeftBox>
        <img src="/images/left.png" />
      </LeftBox>
      <RightBox>
        <img src="/images/right.png" />
      </RightBox> */}
    </BrowserRouter>
  );
}

const LeftBox = styled(Box)`
  position: absolute;
  left: 37px;
  bottom: 84px;
`;

const RightBox = styled(Box)`
  position: absolute;
  right: 28px;
  bottom: 56px;
`;

const Panel = styled(Box)`
  width: 100%;
`;
export default App;
