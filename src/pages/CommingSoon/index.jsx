/* eslint-disable jsx-a11y/alt-text */
import { Box, Link, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import GradientText from "../../components/GradientText";

function CommingSoon() {
  const sm = useMediaQuery("(max-width : 710px)");

  return (
    <StyledContainer>
      <GradientText size={72}>Coming Soon</GradientText>
    </StyledContainer>
  );
}

const StyledContainer = styled(Box)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default CommingSoon;
