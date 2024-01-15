// Components
import { PageStatus } from "../../layout/subheader/PageStatus";
import { PageHelperContainer } from "../../layout/subheader/PageHelperContainer";

// Styled Elements
import { SubheaderStyles } from "assets/styles/layout/subheader";

export const SubHeader = () => {
  return (
    <SubheaderStyles.ContainerPublic>
      <PageStatus />
      <PageHelperContainer />
    </SubheaderStyles.ContainerPublic>
  );
};
