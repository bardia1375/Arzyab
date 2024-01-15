/* eslint-disable array-callback-return */
import { useState } from "react";
// Components
import { ConfirmButton, Modal, Typography } from "components/common";
import { FormBuilderStyle } from "assets/styles/layout";
import { TableComponent } from "components/common/publicTable/Main";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPositions } from "../../routes/Home/WorkFlow/Module";

// Styled Elements
import styled from "styled-components";

export const WorkFlowStarters = ({
  onClose,
  header,
  setListOfStarters,
  listOfStarters,
  startersNoRemove,
  editMode,
  unique,
  setEditCheck,
  newRowHandler,
  notShowDeletebox,
  setLines,
  name,
  column,
  setColumn,
}) => {
  const { positions, loading, positionsPagination } = useSelector(
    (state) => state.workFlow
  );
  const [dataShow, setDataShow] = useState(null);
  const [newData, setNewData] = useState(listOfStarters);
  const [uniqueCheck, setUniqueCheck] = useState(unique);

  //Set Titles
  const titles = [
    { title: "نام کاربری" },
    { title: "شمارۀ کارمندی" },
    { title: "سمت" },
  ];
  //  const dataShow = positions?.map((item) => [
  //     item?.Person?.Name !== null || undefined
  //       ? `${item?.Person?.FirstName} ${item?.Person?.LastName}`
  //       : " ",
  //     item?.Person?.PersonnelId !== null || undefined
  //       ? item?.Person?.PersonnelId
  //       : " ",
  //     item?.Name !== null || undefined ? item?.Name : " ",
  //     item.Unique !== null || undefined ? item.Unique : " ",
  //   ]);

  useEffect(() => {
    if (positions !== null && positions !== undefined) {
      setDataShow(
        positions?.map((item) => [
          item?.Person?.Name !== null || undefined
            ? `${item?.Person?.FirstName} ${item?.Person?.LastName}`
            : " ",
          item?.Person?.PersonnelId !== null || undefined
            ? item?.Person?.PersonnelId
            : " ",
          item?.Name !== null || undefined ? item?.Name : " ",
          item.Unique !== null || undefined ? item.Unique : " ",
        ])
      );
    }
  }, [positions]);

  const listHandler = (e) => {
    let checker = 0;
    newData.map((item) => {
      if (item.unique === e.unique) {
        checker += 1;
      }
    });
    if (checker > 0) {
      setNewData(newData.filter((item) => item.unique !== e.unique));
    } else {
      setNewData([...newData, e]);
    }
  };

  const editStarter = (e) => {
    // if (checkEdit === 0) {
    let counter = 0;
    newData.map((item) => {
      if (item.unique === e.unique) {
        counter += 1;
      }
    });
    if (counter === 0) {
      setNewData(
        newData.map((item) => {
          if (item.unique === uniqueCheck) {
            setUniqueCheck(e.unique);
            setEditCheck({ ...e, editUnique: uniqueCheck });
            return {
              ...item,
              name: e.name,
              unique: e.unique,
              position: e.position,
            };
          } else {
            return item;
          }
        })
      );
    }
  };

  const tickModalHandler = () => {
    setListOfStarters(newData);
    onClose(false);
  };

  return (
    <Modal>
      <div style={{ overflowY: "scroll", height: "65vh" }}>
        <AddContainer>
          <span style={{ margin: "20px" }}>
            <Typography size="xl" weight="thin">
              {header}
            </Typography>
          </span>
          <br />
          <TableComponent
            checkBox
            page={"فرم"}
            noBorderButton
            dropData={["پایان دوره خدمت", "اخراج", "استعفا", "سایر"]}
            data={dataShow}
            title={titles}
            loading={loading}
            pagination={positionsPagination?.PageCount}
            fetchData={fetchPositions}
            checkBoxHandler={listHandler}
            listChecker={newData}
            editStarter={editStarter}
            startersNoRemove={startersNoRemove}
            noCheckHandler={unique}
          />
        </AddContainer>
        <ButtonsPosition>
          <FormBuilderStyle.AddButton>
            <ConfirmButton
              onClick={() => onClose(false)}
              variant="bordered"
              color="orange"
            >
              <Typography>لغو</Typography>
            </ConfirmButton>
            <ConfirmButton
              onClick={tickModalHandler}
              // onClick={() => changePageHandler(navigateAddress)}
              variant="linear"
              color="white"
              bg="secondary"
              padding="4px 12px"
              // height="20px"
              borderStyle="none"
              shadow="0px 7px 15px #00000033"
              hover={true}
            >
              <Typography whiteSpace={"no-wrap"}>ثبت افراد</Typography>
            </ConfirmButton>
          </FormBuilderStyle.AddButton>
        </ButtonsPosition>
      </div>
    </Modal>
  );
};

export const ActionButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  overflow-y: scroll;
`;

export const ButtonsPosition = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

export const ActionItems = styled.div`
  display: ${({ isDeleteMode }) => (isDeleteMode ? "none" : "flex")};
  border: 1px solid ${({ theme }) => theme.color.gray};
  padding: 4px;
  margin: 0 4px;
  gap: 6px;
  border-radius: 16px;

  img {
    width: 18px;
    transition: 300ms;

    &:hover {
      transform: scale(1.1);
      rotate: ${({ type }) => type === "status" && "-180deg"};
    }
  }
`;

export const AddContainer = styled.div`
  padding: 10px;
  border-radius: 20px;
  min-width: 300px;
  border: 2px solid #cbcbcb;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: inset 0px -30px 40px #00000017, 0px 24px 65px #a0bdc180;
  color: ${({ theme }) => theme.color.red};
`;

export const Splitter = styled.div`
  width: 100%;
  text-align: center;
  border-top: 2px solid darkGrey;
  margin: 20px 0;
`;
