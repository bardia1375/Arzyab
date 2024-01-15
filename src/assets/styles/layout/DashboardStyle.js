import styled from "styled-components";

export const Features = styled.img`
  cursor: pointer;
  margin: 0 5px;
  width: 40px;
  height: 40px;
  transition: transform 0.2s; /* Animation */
  :hover {
    /* transform: scale(1.1); */
  }
`;

export const VerticalLine = styled.div`
  border-left: 1px solid
    ${({ enableMode }) => (enableMode ? "#75C9DB" : "#ccc")};
  height: 40px;
  margin: 5px;
`;

export const PopUp = styled.img`
  position: absolute;
  top: 50px;
`;

export const FeaturePopUp = styled.div`
  display: flex;
`;
