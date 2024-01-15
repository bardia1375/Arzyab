import { useState } from "react";
import styled, { css } from "styled-components";

// Styled
import { Typography } from "components/common";
import { useEffect } from "react";
import { useRef } from "react";

export const Dropdown = ({
  title,
  onClick,
  type,
  setSelectedState = () => {},
  firstData,
  dropData,
  color,
  imageSrc,
  width,
  justifyContent,
  whiteSpace,
  readOnly,
  borderRadius,
}) => {
  const [showDrop, setShowDrop] = useState(false);
  const [selected, setSelected] = useState(firstData);
  const ref = useRef();
  useEffect(() => {
    setSelected(firstData);
  }, [firstData]);

  const handleToggleDrop = () => setShowDrop((prevState) => !prevState);
  const handleSetSelected = (text) => {
    setSelected(text);
    setSelectedState(text);
  };
  // Returned Selected value
  useEffect(() => {
    if (onClick !== undefined) {
      onClick(selected);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  const dropItems = dropData
    ?.filter(
      (t) =>
        (t.Unique ? t?.Unique : t) !==
        (selected?.Unique ? selected?.Unique : selected)
    )
    .map((t, index) => (
      <Typography
        onClick={() =>
          handleSetSelected(
            t?.Unique ? { Title: t?.Title, Unique: t?.Unique } : t
          )
        }
        size="sm"
        weight="light"
        key={index}
      >
        {t?.Title ? t?.Title : t}
      </Typography>
    ));

  useEffect(() => {
    const closeDropDown = (e) => {
      if (showDrop && ref.current && !ref.current.contains(e.target)) {
        setShowDrop(false);
      }
    };
    document.body.addEventListener("click", closeDropDown);

    return () => document.body.removeEventListener("click", closeDropDown);
  }, [showDrop]);

  return (
    <StyledDropdown
      type={type}
      color={color}
      ref={ref}
      justifyContent={justifyContent}
    >
      <Typography size="base" weight="medium" whiteSpace={true}>
        {title}
      </Typography>
      <StyledSelect
        showDrop={showDrop}
        type={type}
        width={width}
        onClick={readOnly ? null : handleToggleDrop}
        color={color}
        show={showDrop}
        borderRadius={borderRadius}
      >
        <Typography size="sm" weight="medium" whiteSpace color={color}>
          {selected?.Title ? selected?.Title : selected}
        </Typography>
        {showDrop && (
          <SelectDropdown color={color} type={type} width="100%">
            {dropItems}
          </SelectDropdown>
        )}
        {/* <img
          src={imageSrc}
          alt="arrow"
          style={showDrop ? { transform: "rotate(180deg)" } : {}}
        /> */}
      </StyledSelect>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  ${(props) => {
    switch (props.type) {
      case "ساعت کاری":
        return css`
          width: 100%;
          display: flex;
          gap: 12px;
          color: ${({ theme, color }) => theme.color[color]};
        `;
      case "عمومی":
        return css`
          /* width: 100%; */
          display: flex;
          align-items: center;
          gap: 12px;
          color: ${({ theme, color }) => theme.color[color]};
        `;
      default:
        return css`
          display: flex;
          align-items: center;
          justify-content: ${({ justifyContent }) =>
            justifyContent ? "justifyContent" : "center"};
          gap: 12px;
          color: ${({ theme, color }) => theme.color[color]};
        `;
    }
  }}
`;

const StyledSelect = styled.div`
  ${(props) => {
    switch (props.type) {
      case "ساعت کاری":
        return css`
          position: relative;
          z-index: ${({ show, theme }) => (show ? theme.z.navDrop : "0")};
          color: ${({ theme, color }) => theme.color[color]};
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 24px;
          justify-content: space-between;
          padding: 2px 20px;
          width: 100%;
          height: 38px;
          background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
          border: 1px solid var(--unnamed-color-cbcbcb);
          background: #ffffff 0% 0% no-repeat padding-box;
          border: 1px solid #cbcbcb;
          border-radius: 6px;
          opacity: 1;
          border-bottom-left-radius: ${({ showDrop }) =>
            showDrop === true ? "0px" : null};
          border-bottom-right-radius: ${({ showDrop }) =>
            showDrop === true ? "0px" : null};
          img {
            color: black;
            transition: 300ms;
            width: 20px;
            height: 10px;
            opacity: 1;
          }
        `;
      case "عمومی":
        return css`
          position: relative;
          z-index: ${({ show, theme }) => (show ? theme.z.navDrop : "0")};
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-width: 120px;
          width: 100%;
          padding: 2px 20px;
          border-radius: ${({ show }) => (show ? "6px 6px 0px 0px" : "6px")};
          border: 1px solid
            ${({ theme, color }) =>
              theme.color[color] ? theme.color[color] : color};
          border: ${({ show }) =>
            show
              ? `1px solid ${({ color }) => (color ? color : "#f5f5f5")}`
              : ""};
          background: #f5f5f5 0% 0% no-repeat padding-box;
          color: ${({ theme, color }) => theme.color[color]};
          cursor: pointer;

          img {
            width: 12px;
            height: 28px;
            transition: 300ms;
          }

          @media (min-width: 1100px) {
            min-width: 180px;
            width: 100%;
          }
        `;
      default:
        return css`
          position: relative;
          z-index: ${({ show, theme }) => (show ? theme.z.navDrop : "0")};
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          width: ${({ width }) => (width ? width : "120px")};
          padding: 2px 20px;
          border-radius: ${({ show, borderRadius }) =>
            show ? "20px 20px 0px 0px" : borderRadius ? borderRadius : "20px"};
          border: 1px solid ${({ theme, color }) => theme.color[color]};
          background-color: ${({ theme }) => theme.color.gray};
          color: ${({ theme, color }) => theme.color[color]};
          cursor: pointer;

          img {
            width: 12px;
            height: 8px;
            transition: 300ms;
          }

          @media (min-width: 1100px) {
            width: ${({ width }) => (width ? width : "180px")};
          }
          @media (max-width: 1260px) {
            width: 100%;
          }
        `;
    }
  }}
`;

const SelectDropdown = styled.div`
  ${(props) => {
    switch (props.type) {
      case "ساعت کاری":
        return css`
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          width: 100%;
          background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
          border: 1px solid var(--unnamed-color-cbcbcb);
          background: #ffffff 0% 0% no-repeat padding-box;
          border: 1px solid #cbcbcb;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;

          /* border: 2px solid ${({ theme, color }) => theme.color[color]};
        border-radius: 0 0 20px 20px;
        background-color: ${({ theme }) => theme.color.gray}; */

          & > span {
            border-top: 1px solid #fff;
            padding: 0 20px;
          }
        `;
      case "عمومی":
        return css`
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          min-width: 120px;
          width: 100%;
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid
            ${({ color, theme }) =>
              theme.color[color]
                ? theme.color[color]
                : color
                ? color
                : " #183573 "};
          /* border: ${({ show }) => (show ? "1px solid  #f5f5f5 " : "")}; */
          border-radius: 0 0 6px 6px;
          background: #f5f5f5 0% 0% no-repeat padding-box;
          & > span {
            border-top: 1px solid #fff;
            padding: 0 20px;
          }
          color: ${({ color }) => (color ? color : "")};

          @media (min-width: 1100px) {
            width: 100%;
            /* min-width: ${({ width }) => (width ? width : "180px")}; */
            min-width: 180px;
          }
        `;
      default:
        return css`
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          width: ${({ width }) => (width ? width : "120px")};
          border: 1px solid ${({ theme, color }) => theme.color[color]};
          border-radius: 0 0 20px 20px;
          background-color: ${({ theme }) => theme.color.gray};
          /* height: 120px; */
          overflow-y: scroll;
          & > span {
            border-top: 1px solid #fff;
            padding: 0 20px;
          }
          @media (min-width: 1100px) {
            width: ${({ width }) => (width ? width : "180px")};
          }
        `;
    }
  }}
`;
