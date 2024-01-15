import { useState } from "react";
import styled from "styled-components";

// Styled
import { Typography } from "components/common";
import { useEffect } from "react";

//Images
import RemoveButton from "assets/images/item-actions/remove-button.svg";

export const MultipleSelect = ({
  title,
  type,
  onClick,
  setSelectedState = () => {},
  firstData,
  dropData,
  color,
  imageSrc,
  width,
  whiteSpace,
  readOnly,
  borderRadius,
}) => {
  const [showDrop, setShowDrop] = useState(false);
  const [selected, setSelected] = useState([]);
  //   useEffect(() => {
  //     setSelected([firstData]);
  //   }, [firstData]);
  const handleToggleDrop = () => setShowDrop((prevState) => !prevState);
  const handleSetSelected = (text) => {
    let counter = 0;
    // eslint-disable-next-line array-callback-return
    selected.map((item) => {
      if (item === text) {
        counter++;
      } else {
        // eslint-disable-next-line no-self-assign
        counter = counter;
      }
    });
    if (counter > 0) {
      return null;
    } else {
      setSelected((prev) => [...prev, text]);
    }
    setSelectedState(selected);
  };
  useEffect(() => {
    if (onClick !== undefined) {
      onClick(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  const dropItems = dropData
    ?.filter((t) => t !== selected)
    .map((t, index) => (
      <Typography
        onClick={() => handleSetSelected(t.Unique ? t.Unique : t)}
        size="sm"
        weight="light"
        key={index}
      >
        {t.Title ? t.Title : t}
      </Typography>
    ));

  const removeListItemsHandler = (name) => {
    setSelected(selected.filter((item) => item !== name));
  };

  return (
    <StyledDropdown type={type} color={color}>
      <Typography size="base" weight="medium" whiteSpace={true}>
        {title}
      </Typography>
      <StyledSelect
        selected={selected}
        showDrop={showDrop}
        type={type}
        width={width}
        color={color}
        show={showDrop}
        borderRadius={borderRadius}
      >
        {selected.map((item, index) => (
          <Typography
            key={index}
            size="sm"
            weight="medium"
            whiteSpace
            color={color}
          >
            <SelectedItems>
              {item}
              <img
                style={{ cursor: "pointer" }}
                width={25}
                src={RemoveButton}
                alt="RemoveButton"
                onClick={() => removeListItemsHandler(item)}
              />
            </SelectedItems>
          </Typography>
        ))}
        {showDrop && (
          <SelectDropdown color={color} type={type} width={width}>
            {dropItems}
          </SelectDropdown>
        )}
        <img
          onClick={readOnly ? null : handleToggleDrop}
          src={imageSrc}
          alt="arrow"
          style={showDrop ? { transform: "rotate(180deg)" } : {}}
        />
      </StyledSelect>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  /* width: 100%; */
  display: flex;
  /* height: 40px; */
  gap: 12px;
  color: ${({ theme, color }) => theme.color[color]};
`;

const SelectedItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: #e7e7e7;
  display: flex;
  gap: 5px;
  padding-right: 5px;
  padding-left: 5px;
  border-radius: 5px;
`;

const StyledSelect = styled.div`
  position: relative;
  z-index: ${({ show, theme }) => (show ? theme.z.navDrop : "0")};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  /* width: ${({ width }) => (width ? width : "120px")}; */
  min-width: 150px;

  padding: 2px 20px;
  border-radius: ${({ show }) => (show ? "6px 6px 0px 0px" : "6px")};
  border: 1px solid
    ${({ theme, color }) => (theme.color[color] ? theme.color[color] : color)};
  border: ${({ show }) =>
    show ? `1px solid ${({ color }) => (color ? color : "red")}` : ""};
  background: #f5f5f5 0% 0% no-repeat padding-box;
  color: ${({ theme, color }) => theme.color[color]};
  cursor: pointer;

  img {
    width: 12px;
    height: 28px;
    transition: 300ms;
  }
`;

const SelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  min-width: 150px;
  width: 100%;
  border: 1px solid ${({ color }) => (color ? color : "red")};
  border-radius: 0 0 6px 6px;
  background: #f5f5f5 0% 0% no-repeat padding-box;
  & > span {
    border-top: 1px solid #fff;
    padding: 0 20px;
  }
  color: ${({ color }) => (color ? color : "")};
`;
