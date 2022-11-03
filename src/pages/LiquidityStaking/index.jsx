/* eslint-disable jsx-a11y/alt-text */
import { Box, Link, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import GradientText from "../../components/GradientText";

function LiquidityStaking() {
  const sm = useMediaQuery("(max-width : 710px)");

  return <StyledContainer></StyledContainer>;
}

const StyledContainer = styled(Box)`
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 100px;
`;

export default LiquidityStaking;
