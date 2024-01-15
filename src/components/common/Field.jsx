// Styled Elements
import { ListStyles } from "assets/styles/home/employees";
import { Dropdown, Typography } from "components/common";
import { FormBuilderStyle } from "../../assets/styles/layout/index";

// Images
import QuestionMark from "assets/images/common/question-mark.svg";
import SecondaryArrow from "assets/images/common/arrows/secondary-down.svg";
import { useState } from "react";
import { useEffect } from "react";
import SwitchButton from "./SwitchButton";
import { MultipleSelect } from "./MultipleSelect";
import styled from "styled-components";
import TimeFiled from "./TimeFiled";

export const Field = ({
  unique,
  label,
  id,
  help,
  type,
  value,
  color,
  size,
  name,
  placeHolder,
  onClick,
  onChange,
  firstData,
  dropData,
  ref,
  autoFocus,
  required,
  readOnly,
  disabled,
  onInvalidMessage,
  textAlign,
  page,
  checked,
  placeholderTextAlign,
  min,
  max,
  step,
  noBorderOnFocus,
  description,
  setWorkState,
  workState,
  autoComplete,
  width,
  dropDownColor,
  arrowSrc,
  innerTextSwitch,
  checkBoxList,
  radioList,
  radioCheck,
  pictureList,
  noMargin,
  style,
  borderColor,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [deleteCause, setDeleteCause] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (setWorkState !== undefined) {
      if (
        parseInt(value) > parseInt(noBorderOnFocus?.Max) ||
        parseInt(value) < parseInt(noBorderOnFocus?.Min)
      ) {
        let counter = 0;
        // eslint-disable-next-line array-callback-return
        workState?.map((item) => {
          if (item.id === unique) {
            counter += 1;
          } else {
            // eslint-disable-next-line no-self-assign
            counter = counter;
          }
        });
        if (counter > 0) {
          return;
        } else {
          if (!!workState.push({ id: unique })) {
            setWorkState((prev) => [...prev]);
          }
        }
      } else {
        let removed = workState?.filter((item) => item.id !== unique);
        setWorkState(removed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  // Handlers
  const deleteCauseChangeHandler = (text) => setDeleteCause(text);
  // For hovering on question mark
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  let questionMark = true;
  return (
    <FormBuilderStyle.InputBody>
      {type === "checkbox" ? (
        <FormBuilderStyle.LabelContainer
          style={style}
          htmlFor={id}
          color={color}
        >
          <FormBuilderStyle.InputCheckBox
            color={color}
            onClick={onClick}
            onChange={onChange}
            type={type}
            value={value}
            name={name}
            size={size}
            id={id}
            help={help}
            checked={checked}
            readOnly={readOnly}
          />
          <p>{label}</p>
          <FormBuilderStyle.CheckMark />
        </FormBuilderStyle.LabelContainer>
      ) : type === "picture" ? (
        <div>
          <div style={{ display: "flex" }}>
            {description && (
              <div style={{ position: "relative" }}>
                {questionMark && (
                  <FormBuilderStyle.QuestionIcon
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    src={QuestionMark}
                    alt={"QuestionMark"}
                    onClick={() => {}}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  />
                )}
                {isHovering && (
                  <FormBuilderStyle.HelpMessageCartabel>
                    <span>{description ? description : "راهنما"}</span>
                  </FormBuilderStyle.HelpMessageCartabel>
                )}
              </div>
            )}
            <Typography color={color} size={"sm"}>
              {label}
            </Typography>
          </div>
          <FormBuilderStyle.LineText justifyContent="flex-start">
            {pictureList?.map((item, index) => (
              <FormBuilderStyle.CardImage key={item?.id}>
                <img src={item.address} alt={item.address} height="100px" />
                <FormBuilderStyle.ParagraphContainer>
                  <p>{item?.title}</p>
                </FormBuilderStyle.ParagraphContainer>
              </FormBuilderStyle.CardImage>
            ))}
          </FormBuilderStyle.LineText>
        </div>
      ) : type === "attach" ? (
        <div>
          <div style={{ display: "flex" }}>
            {description && (
              <div style={{ position: "relative" }}>
                {questionMark && (
                  <FormBuilderStyle.QuestionIcon
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    src={QuestionMark}
                    alt={"QuestionMark"}
                    onClick={() => {}}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  />
                )}
                {isHovering && (
                  <FormBuilderStyle.HelpMessageCartabel>
                    <span>{description ? description : "راهنما"}</span>
                  </FormBuilderStyle.HelpMessageCartabel>
                )}
              </div>
            )}
            <Typography color={color} size={"sm"}>
              {label}
            </Typography>
          </div>
          <FormBuilderStyle.LineText justifyContent="flex-start">
            <input
              type="file"
              id={`select-image`}
              name="address"
              style={{ display: "none" }}
              // onChange={(e) => fileHandler(e, data?.id)}
            />
            <LabelButton htmlFor={`select-image`}>بارگذاری فایل</LabelButton>
          </FormBuilderStyle.LineText>
        </div>
      ) : type === "button" ? (
        <LabelButton color={color}>{label}</LabelButton>
      ) : type === "multiple" ? (
        <div>
          <div style={{ display: "flex" }}>
            {description && (
              <div style={{ position: "relative" }}>
                {questionMark && (
                  <FormBuilderStyle.QuestionIcon
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    src={QuestionMark}
                    alt={"QuestionMark"}
                    onClick={() => {}}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  />
                )}
                {isHovering && (
                  <FormBuilderStyle.HelpMessageCartabel>
                    <span>{description ? description : "راهنما"}</span>
                  </FormBuilderStyle.HelpMessageCartabel>
                )}
              </div>
            )}
            <Typography color={color} size={"sm"}>
              {label}
            </Typography>
          </div>
          <FormBuilderStyle.LineText justifyContent="flex-start">
            {checkBoxList?.map((item, index) => (
              <FormBuilderStyle.LabelContainer
                key={index}
                htmlFor={id}
                color={color}
              >
                <FormBuilderStyle.InputCheckBox
                  color={color}
                  onClick={onClick}
                  onChange={onChange}
                  type={"checkbox"}
                  value={item}
                  name={item}
                  size={size}
                  id={id}
                  help={help}
                  checked={checked}
                  readOnly={readOnly}
                />
                <p>{item}</p>
                <FormBuilderStyle.CheckMark />
              </FormBuilderStyle.LabelContainer>
            ))}
          </FormBuilderStyle.LineText>
        </div>
      ) : type === "radio" ? (
        <FormBuilderStyle.LineText>
          <div style={{ display: "flex" }}>
            {description && (
              <div style={{ position: "relative" }}>
                {questionMark && (
                  <FormBuilderStyle.QuestionIcon
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    src={QuestionMark}
                    alt={"QuestionMark"}
                    onClick={() => {}}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  />
                )}
                {isHovering && (
                  <FormBuilderStyle.HelpMessageCartabel>
                    <span>{description ? description : "راهنما"}</span>
                  </FormBuilderStyle.HelpMessageCartabel>
                )}
              </div>
            )}
            <Typography color={color} size={"sm"}>
              {label}
            </Typography>
          </div>
          <FormBuilderStyle.LineText justifyContent="flex-start">
            {radioList?.map((item, index) => (
              <FormBuilderStyle.LabelRadio key={index} color={color}>
                <FormBuilderStyle.InputRadio
                  color={color}
                  type={"radio"}
                  name={"radio"}
                  value={item}
                  onChange={onChange}
                  checked={radioCheck}
                  readOnly={readOnly}
                />
                <p>{item}</p>
                <FormBuilderStyle.SpanRadio color={color} />
              </FormBuilderStyle.LabelRadio>
            ))}
          </FormBuilderStyle.LineText>
        </FormBuilderStyle.LineText>
      ) : type === "multiple-select" ? (
        <ListStyles.ItemForm>
          <Typography color={color} size="sm">
            {label}
          </Typography>
          <MultipleSelect
            onClick={onClick}
            value={value}
            name={name}
            label={label}
            dropData={dropData}
            color={dropDownColor}
            type="عمومی"
            readOnly={readOnly}
            imageSrc={SecondaryArrow}
          />
        </ListStyles.ItemForm>
      ) : type === "switch" ? (
        <ListStyles.ItemForm>
          <div style={{ display: "flex" }}>
            {description && (
              <div style={{ position: "relative" }}>
                {questionMark && (
                  <FormBuilderStyle.QuestionIcon
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    src={QuestionMark}
                    alt={"QuestionMark"}
                    onClick={() => {}}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  />
                )}
                {isHovering && (
                  <FormBuilderStyle.HelpMessageCartabel>
                    <span>{description ? description : "راهنما"}</span>
                  </FormBuilderStyle.HelpMessageCartabel>
                )}
              </div>
            )}
          </div>
          <div style={{ marginLeft: "10px" }}>
            <Typography color={color}>{label}</Typography>
          </div>
          <SwitchButton innerTextSwitch={innerTextSwitch} />
        </ListStyles.ItemForm>
      ) : type === "dropdown" ? (
        <ListStyles.ItemForm>
          <div style={{ display: "flex" }}>
            {description && (
              <div style={{ position: "relative" }}>
                {questionMark && (
                  <FormBuilderStyle.QuestionIcon
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    src={QuestionMark}
                    alt={"QuestionMark"}
                    onClick={() => {}}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  />
                )}
                {isHovering && (
                  <FormBuilderStyle.HelpMessageCartabel>
                    <span>{description ? description : "راهنما"}</span>
                  </FormBuilderStyle.HelpMessageCartabel>
                )}
              </div>
            )}
          </div>
          <Typography size={size} color={color}>
            {label}
          </Typography>
          <Dropdown
            width={width}
            onClick={onClick}
            color={dropDownColor}
            type="عمومی"
            firstData={firstData}
            dropData={dropData}
            imageSrc={arrowSrc ? arrowSrc : SecondaryArrow}
            setSelectedState={deleteCauseChangeHandler}
            readOnly={readOnly}
          />
        </ListStyles.ItemForm>
      ) : type === "time" ? (
        <div
          style={{
            position: "relative",
            display: "flex",
            border: `${open ? "" : "2px solid darkgrey"}`,
            width: "150px",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px",
            borderRadius: "5px",
          }}
        >
          <TimeFiled
            setOpen={setOpen}
            open={open}
            noMargin={noMargin}
            autoComplete={autoComplete}
            noBorderOnFocus={noBorderOnFocus}
            setWorkState={setWorkState}
            placeholderTextAlign={placeholderTextAlign}
            placeholder={placeHolder}
            onClick={onClick}
            onChange={onChange}
            type={type}
            value={value}
            name={name}
            size={size}
            id={id}
            help={help}
            ref={ref}
            autoFocus={autoFocus}
            required={required}
            disabled={disabled}
            textAlign={textAlign}
            page={page}
            step={`${step}`}
            readOnly={readOnly}
            style={style}
            onInvalid={(e) =>
              e.target.setCustomValidity(
                onInvalidMessage
                  ? onInvalidMessage
                  : "لطفا مقادیر لازم را وارد نمایید"
              )
            }
            onInput={(e) => e.target.setCustomValidity("")}
            min={min}
            max={max}
            width={width}
          />
        </div>
      ) : (
        <>
          {description && (
            <div style={{ position: "relative" }}>
              {questionMark && (
                <FormBuilderStyle.QuestionIcon
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  src={QuestionMark}
                  alt={"QuestionMark"}
                  onClick={() => {}}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                />
              )}
              {isHovering && (
                <FormBuilderStyle.HelpMessageCartabel>
                  <span>{description ? description : "راهنما"}</span>
                </FormBuilderStyle.HelpMessageCartabel>
              )}
            </div>
          )}
          <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
          <Typography color={color} size={"sm"} whiteSpace>
            {label}
          </Typography>
          <FormBuilderStyle.InputTextName
            borderColor={borderColor}
            noMargin={noMargin}
            autoComplete={autoComplete}
            noBorderOnFocus={noBorderOnFocus}
            setWorkState={setWorkState}
            placeholderTextAlign={placeholderTextAlign}
            placeholder={placeHolder}
            onClick={onClick}
            onChange={onChange}
            type={type}
            value={value}
            name={name}
            size={size}
            id={id}
            help={help}
            ref={ref}
            autoFocus={autoFocus}
            required={required}
            disabled={disabled}
            textAlign={textAlign}
            page={page}
            step={`${step}`}
            readOnly={readOnly}
            style={style}
            onInvalid={(e) =>
              e.target.setCustomValidity(
                onInvalidMessage
                  ? onInvalidMessage
                  : "لطفا مقادیر لازم را وارد نمایید"
              )
            }
            onInput={(e) => e.target.setCustomValidity("")}
            min={min}
            max={max}
            width={width}
          /></div>
        </>
      )}
    </FormBuilderStyle.InputBody>
  );
};

export const LabelButton = styled.label`
  white-space: nowrap;
  padding: ${({ padding }) => (padding ? padding : "2px 40px")};
  border-width: 1px;
  border-style: ${({ borderStyle }) => (borderStyle ? borderStyle : "solid")};
  border-radius: ${({ radius }) => (radius ? radius : "32px")};
  margin: ${({ margin }) => (margin ? margin : "5px")};
  cursor: pointer;
  transition: 500ms;
  display: flex;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "space-between"};
  &:hover {
    transform: ${({ hover }) => (hover ? "scale(1.1)" : null)};
  }
  white-space: ${({ whiteSpace }) => (whiteSpace ? whiteSpace : "")};
  align-items: center;
  width: ${({ width }) => (width ? width : null)};
  height: ${({ height }) => (height ? height : null)};
  box-shadow: ${({ shadow }) => shadow};
  border-color: ${({ color }) => (color ? color : "#e67205")};
  color: ${({ color }) => (color ? color : "#e67205")};
  background: ${({ theme, bg }) => (bg ? theme.color[bg] : "#fff")};
`;
