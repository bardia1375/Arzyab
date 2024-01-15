import { useRef, useEffect } from "react";
import styled from "styled-components";

import { Typography } from "components/common";

// Images
import Tick from "assets/images/common/tick/secondary-bg.svg";
import ProgressHelper from "assets/images/common/progress-step-helper.svg";

export const Progress = ({ step, texts }) => {
  const img1Ref = useRef();
  const img2Ref = useRef();

  useEffect(() => {
    if (step > 1) {
      img1Ref.current.setAttribute("src", Tick);
    }
    if (step > 2) {
      img2Ref.current.setAttribute("src", Tick);
    }
  }, [step]);

  return (
    <Container>
      <StepContent isActive={step === 1} isConfirmed={step > 1}>
        <Typography size="sm">{texts[0]}</Typography>
        <img src={ProgressHelper} alt="test" ref={img1Ref} />
      </StepContent>
      <StepProgress isActive={step >= 2} />
      <StepContent isActive={step === 2} isConfirmed={step > 2}>
        <Typography size="sm">{texts[1]}</Typography>
        {step >= 2 && <img src={ProgressHelper} alt="test" ref={img2Ref} />}
      </StepContent>
      <StepProgress isActive={step >= 3} />
      <StepContent isActive={step === 3}>
        <Typography size="sm">{texts[2]}</Typography>
        {step === 3 && <img src={ProgressHelper} alt="test" />}
      </StepContent>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: -8px;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 60%;
`;

const StepContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15px;
  height: 15px;
  background-color: ${({ isActive, isConfirmed }) =>
    isConfirmed ? "trasnparent" : isActive ? "transparent" : "#ccc"};
  border-radius: 50%;

  img {
    width: 15px;
    display: block;
  }

  span {
    position: absolute;
    top: -30px;
    width: 200px;
    color: ${({ theme, isActive, isConfirmed }) =>
      isConfirmed ? theme.color.secondary : isActive ? theme.color.orange : "#ccc"};
  }
`;

const StepProgress = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${({ theme, isActive }) => (isActive ? theme.color.secondary : "#ccc")};
  opacity: 0.9;
`;
