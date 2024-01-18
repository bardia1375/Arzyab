import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";

const MyContextProvider = ({ children }) => {
  const [myValue, setMyValue] = useState([]);
  const [bardia, setBardia] = useState("");
  const [orderInformation, setOrderInformation] = useState([]);
  useEffect(() => {
    // Retrieve the image data from local storage
    const savedImage = localStorage.getItem("savedImage");
    console.log("savedImagesavedImage", savedImage);
    // Update the state with the retrieved image data
    if (savedImage) {
      setBardia(savedImage);
    }
  }, []); // Empty dependency array ensures this runs once on component mount
  useEffect(() => {
    setOrderInformation([
      {
        id: 1,
        day: "چهارشنبه",
        date: "4 بهمن",
        bg: "#fff",
        text: "ساعت 12 تا 15",
        Latitude: "35.738829",
        Longitude: "51.446269",
        img: bardia,
      },
      {
        id: 2,
        day: "سه‌شنبه",
        date: "3 بهمن",
        bg: "#fff",
        text: "ساعت 12 تا 15",
        Latitude: "35.708829",
        Longitude: "51.406269",
        img: bardia,
      },
    ]);
  }, [bardia]);
  return (
    <MyContext.Provider
      value={{
        myValue,
        setMyValue,
        bardia,
        setBardia,
        setOrderInformation,
        orderInformation,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
