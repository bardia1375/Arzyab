import React from "react";
import { TableList } from "./TableList";
export const TableComponent = (props) => {
  return (
    // <Container>
    // <MainStyles.Container>
    <>
      {/* <SubHeader /> */}
      <TableList
        page={props.page}
        addModalDescription={props.addModalDescription}
        description={props.description}
        hoverDetail={props.hoverDetail}
        noAddModal={props.noAddModal}
        hoverActionItems={props.hoverActionItems}
        tabsData={props.tabsData}
        dropData={props.dropData}
        loading={props.loading}
        titles={props.title}
        data={props.data}
        column={props.title.length + 1}
        buttonTitle={props.buttonTitle}
        pagination={props.pagination}
        fetchData={props.fetchData}
        fetchDeleteData={props.fetchDeleteData}
        fetchRecoverData={props.fetchRecoverData}
        fetchCloneData={props.fetchCloneData}
        navigateAddress={props.navigateAddress}
        navigateNewAddress={props.navigateNewAddress}
        navigateDetailAddress={props.navigateDetailAddress}
        navigateEditAddress={props.navigateEditAddress}
        recoveryButton={props.recoveryButton}
        mailButton={props.mailButton}
        copyButton={props.copyButton}
        penButton={props.penButton}
        trashButton={props.trashButton}
        trashRedButton={props.trashRedButton}
        settingButton={props.settingButton}
        innerButton={props.innerButton}
        outerButton={props.outerButton}
        hoverMode={props.hoverMode}
        reportType={props.reportType}
        editDisplayed={props.editDisplayed}
        noBorderButton={props.noBorderButton}
        checkBox={props.checkBox}
        checkBoxHandler={props.checkBoxHandler}
        listChecker={props.listChecker}
        noCheckHandler={props.noCheckHandler}
        editStarter={props.editStarter}
        startersNoRemove={props.startersNoRemove}
      />
      {/* <main /> */}
    </>
    // </MainStyles.Container>
    // </Container>
  );
};

// const Container = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// `
