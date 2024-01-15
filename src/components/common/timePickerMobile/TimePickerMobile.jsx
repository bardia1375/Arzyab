import React, { useState, useRef, useEffect } from "react";
import "./TimeInput.css";

const TimePickerMobile = ({ value, onChange }) => {
  const hourContainerRef = useRef(null);
  const minuteContainerRef = useRef(null);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const handleHourScroll = () => {
    const hourContainer = hourContainerRef.current;
    const scrollPosition = hourContainer.scrollTop;
    const hour = Math.round(scrollPosition / 30) % 24;
    setSelectedHour(hour);
  };

  const handleMinuteScroll = () => {
    const minuteContainer = minuteContainerRef.current;
    const scrollPosition = minuteContainer.scrollTop;
    const minute = Math.round(scrollPosition / 30) % 60;
    setSelectedMinute(minute);
  };

  useEffect(() => {
    const hourContainer = hourContainerRef.current;
    const minuteContainer = minuteContainerRef.current;

    const hourScrollHeight = hourContainer.scrollHeight;
    const minuteScrollHeight = minuteContainer.scrollHeight;

    const hourCenter = Math.floor(hourScrollHeight / 2 / 40) * 40;
    const minuteCenter = Math.floor(minuteScrollHeight / 2 / 40) * 40;
    if (value) {
      const zM = (value.split(":")[1] * 60 * 40) / 80;
      const zH = (value.split(":")[0] * 24 * 40) / 32;
      minuteContainer.scrollTo(0, zM);
      hourContainer.scrollTo(0, zH);
    } else {
      hourContainer.scrollTo(0, hourCenter);
      minuteContainer.scrollTo(0, minuteCenter);
    }

    const selectedHour = Math.round(hourCenter / 40) % 24;
    const selectedMinute = Math.round(minuteCenter / 40) % 60;

    setSelectedHour(selectedHour);
    setSelectedMinute(selectedMinute);
  }, []);

  useEffect(() => {
    const hourContainer = hourContainerRef.current;
    const minuteContainer = minuteContainerRef.current;

    const hourScrollHeight = hourContainer.scrollHeight;
    const minuteScrollHeight = minuteContainer.scrollHeight;
    const hourCenter = Math.floor(hourScrollHeight / 2 / 40) * 40;
    const minuteCenter = Math.floor(minuteScrollHeight / 2 / 40) * 40;

    const zM = (value.split(":")[1] * 60 * 40) / 80;
    const zH = (value.split(":")[0] * 24 * 40) / 32;
    minuteContainer.scrollTo(0, zM);
    hourContainer.scrollTo(0, zH);
    const selectedHour = Math.round(hourCenter / 40) % 24;
    const selectedMinute = Math.round(minuteCenter / 40) % 60;

    setSelectedHour(selectedHour);
    setSelectedMinute(selectedMinute);
  }, [value]);

  useEffect(() => {
    onChange(`${selectedHour}:${selectedMinute}`);
  }, [selectedHour, selectedMinute]);

  return (
    <div className="time-picker">
      <div
        className="minute-picker"
        onScroll={handleMinuteScroll}
        ref={minuteContainerRef}
      >
        {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
          <div
            key={minute}
            className={`minute 
            `}
            // ${selectedMinute === minute ? "selected" : ""}
          >
            {minute.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
      <h3>:</h3>
      <div
        className="hour-picker"
        onScroll={handleHourScroll}
        ref={hourContainerRef}
      >
        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
          <div
            key={hour}
            className={`hour 
                  `}
            // ${selectedHour === hour ? "selected" : ""}
          >
            {hour.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimePickerMobile;
