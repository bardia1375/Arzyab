import { useState } from "react";

// Components
import { Typography } from "components/common";

// Styled Elements
import { ListStyles } from "assets/styles/home/employees";

// Images
import Tick from "assets/images/employees/tick.svg";

export const TickItem = ({ title, status, onToggle, isDeleteMode }) => {
  const [tick, setTick] = useState(status);

  const toggleHandler = () => {
    setTick(prevState => !prevState);
    onToggle();
  };

  return (
    <ListStyles.TickItem isDeleteMode={isDeleteMode} isTicked={tick}>
      <Typography weight="light">{title}</Typography>
      <div onClick={toggleHandler}>{tick && <img src={Tick} alt="tick" />}</div>
    </ListStyles.TickItem>
  );
};
