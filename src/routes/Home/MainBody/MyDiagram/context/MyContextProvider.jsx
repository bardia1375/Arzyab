import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";

const MyContextProvider = ({ children }) => {
  const [myValue, setMyValue] = useState([]);
  const [NewImage, setNewImage] = useState("");
  // useEffect(() => {
  //   // Retrieve the image data from local storage
  //   const savedImage = localStorage.getItem("savedImage");
  //   console.log("savedImagesavedImage", savedImage);
  //   // Update the state with the retrieved image data
  //   if (savedImage) {
  //     setNewImage(savedImage);
  //   }
  // }, []); 


  
  return (
    <MyContext.Provider
      value={{
        myValue,
        setMyValue,
        NewImage,
        setNewImage,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
