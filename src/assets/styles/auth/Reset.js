import styled from "styled-components"

// Reset Password Page
export const ResestContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px;
  border-radius: 0 0 30px 30px;
  background: #ff808030;
  box-shadow: inset 0px 0px 80px #75c9db75, 0px 3px 3px #8125254d;
`

// Confirmed Section
export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
  border-radius: 30px;
  background: #9bfbff05;
  box-shadow: inset 0px 0px 80px #75c9db40, 0px 3px 3px #8125254d;
  backdrop-filter: blur(5px);

  & > div {
    color: ${({ theme }) => theme.color.secondary};
  }

  img {
    height: 60px;
  }
`
