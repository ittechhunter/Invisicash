import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Gradient from "rgt";

const GradientText = ({ children, size = 32, weight = 500 }) => {
  return (
    <>
      <Typography fontSize={size} fontFamily={"Syne"} fontWeight={weight}>
        <Gradient dir="left-to-right" from="#F4848A" to="#1888A3">
          {children}
        </Gradient>
      </Typography>
    </>
  );
};

export default GradientText;
