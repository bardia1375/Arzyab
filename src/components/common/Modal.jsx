import styled from "styled-components";

export const Modal = ({
  children,
  style,
  top,
  left,
  overlayWidth,
  overlayHeight,
}) => {
  return (
    <>
      <Overlay
        overlayWidth={overlayWidth}
        overlayHeight={overlayHeight}
      ></Overlay>
      <SModal style={style} top={top} left={left}>
        {children}
      </SModal>
    </>
  );
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ overlayWidth }) => (overlayWidth ? overlayWidth : "100%")};
  height: ${({ overlayHeight }) => (overlayHeight ? overlayHeight : "100%")};
  background-color: #fff1;
  z-index: 2;
  backdrop-filter: blur(5px);
  transition: 300ms;

`;

export const SModal = styled.div`
  position: fixed;
  top: ${({ top }) => (top ? top : "40%")};
  left: ${({ left }) => (left ? left : "50%")};
  transform: translate(-50%, -50%);
 z-index: ${({ theme }) => theme.z.modal};
  transition: 500ms;
  width:100%;
  height:100%
`;
