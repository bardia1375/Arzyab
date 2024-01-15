import React from "react";
import styled, { css } from "styled-components";

const CardContainer = styled.div`
  background: ${(props) => props.color || "#ecfcfc"};
  border-radius: 30px;
  padding: 8px 15px;
  height: ${(props) => (props.height ? props.height : "100%")};
  position: relative;
  width: 100%;
  gap: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-Y: auto;
  overflow-x:hidden;
  margin: ${(props) => (props.margin ? props.margin : "0")};
`;

const CardImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;

  /* Your content styles go here */
`;

const CardTitle = styled.h2`
  /* Your title styles go here */
`;

const CardText = styled.p`
  /* Your text styles go here */
`;

const Card = ({
  title,
  content,
  imageUrl,
  children,
  color,
  height,
  margin,
}) => {
  return (
    <CardContainer color={color} height={height} margin={margin}>
      {imageUrl && <CardImage src={imageUrl} alt="Card" />}
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardText>{content}</CardText>
        {children}
      </CardContent>
    </CardContainer>
  );
};

export default Card;
