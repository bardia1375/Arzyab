// Components
import { Footer } from "components/layout";

// Styled Elements
import { HeaderStyles, MainStyles } from "assets/styles/layout";
import { useLocation } from "react-router-dom";

export const MainLayout = ({ children }) => {
  const location = useLocation();
  
  return (
    <MainStyles.Container flex={location.pathname.length === 1}>
      {/* <Header /> */}
      <HeaderStyles.Container />
      <main>{children}</main>
      <Footer />
    </MainStyles.Container>
  );
};
