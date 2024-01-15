// Components
import { Footer } from "components/layout";

// Styled Elements
import { LoginStyles } from "assets/styles/layout";

// Images
import Background from "assets/images/auth/bg.png";
import TikmentLogo from "assets/images/auth/tikment.svg";

export const LoginLayout = ({ children }) => {
  return (
    <LoginStyles.Container bg={Background}>
      <LoginStyles.Header>
        <img src={TikmentLogo} alt="TikmentLogo" />
      </LoginStyles.Header>
      <main >{children}</main>
      <Footer />
    </LoginStyles.Container>
  );
};
