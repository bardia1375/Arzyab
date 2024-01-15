// Components
import { PageStatus } from "./PageStatus";
import { PageHelperContainer } from "./PageHelperContainer";

// Styled Elements
import { SubheaderStyles } from "assets/styles/layout/subheader";

export const Container = (props) => {
  return (
    <SubheaderStyles.Container>
      <PageStatus {...props} />
      <PageHelperContainer {...props} />
    </SubheaderStyles.Container>
  );
};
