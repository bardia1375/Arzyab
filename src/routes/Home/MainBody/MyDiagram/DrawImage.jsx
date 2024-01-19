import Card from "components/common/Card";
import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "./context/MyContext";
import { Button } from "components/common";

function DrawImage({
  takeImage,
  setForm
}) {
  const { myValue, setMyValue, NewImage, setNewImage } = useContext(MyContext);
  console.log("myValuemyValue", myValue);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [isEraser, setIsEraser] = useState(false);
  const [ImageData, setImageData] = useState(takeImage);
    const getUsers = JSON.parse(localStorage.getItem("NewUsers"));
  // const { index }=useContext(AppContext)
  const [Users,setUsers]=useState(getUsers)
  useEffect(() => {
    // Retrieve the image data from local storage
    const savedImage = localStorage.getItem("savedImage");
    console.log("savedImagesavedImage", savedImage);
    // Update the state with the retrieved image data
    if (savedImage) {
      setNewImage(savedImage);
    }

    // Draw on the canvas
    drawOnCanvas(savedImage);
  }, []); // Empty dependency array ensures this runs once on component mount

  const drawOnCanvas = (imageSrc) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = ImageData;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const handleMouseDown = (event) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (event) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isEraser) {
      // Erase pixels by clearing a rectangle
      ctx.clearRect(x - 5, y - 5, 10, 10);
    } else {
      // Draw with the selected color
      ctx.lineTo(x, y);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };
  const toggleEraser = () => {
    setIsEraser((prevIsEraser) => !prevIsEraser);
  };
  const saveToLocalStorage = () => {
    const canvas = canvasRef.current;
    console.log("canvas", canvas);
    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const imageDataUrl = canvas.toDataURL();
    localStorage.setItem("savedImage", imageDataUrl);
    setImageData(imageDataUrl);



    console.log("getIdgetId",myValue.id);
    console.log("Users",Users);
    if (!Users) {
      const getUsers = JSON.parse(localStorage.getItem("users"));
      const newUsers = [...getUsers];
  
      if (!newUsers[myValue.id].image) {
        newUsers[myValue.id].image = [imageDataUrl];
      } else {
        newUsers[myValue.id].image.push(imageDataUrl);
      }
  
      setUsers(newUsers);
      localStorage.setItem("NewUsers", JSON.stringify(newUsers));
      setForm(1);
    } else {
      const newUsers = [...Users];
  
      if (!newUsers[myValue.id].image) {
        console.log("newUsers[myValue.id].image1",newUsers[myValue.id]);
        console.log("newUsers[myValue.id].image1",myValue.id);

        newUsers[myValue.id].image = [imageDataUrl];
      } else {
        console.log("newUsers[myValue.id].image2",newUsers[myValue.id].image);
        console.log("newUsers[myValue.id].image2",myValue.id);

        newUsers[myValue.id].image.push(imageDataUrl);
      }
  
      setUsers(newUsers);
      localStorage.setItem("NewUsers", JSON.stringify(newUsers));
      setForm(1);
    }

  };
  const handleTouchStart = (event) => {
    isDrawingRef.current = true;
    startDrawing(event.touches[0]);
  };
  const startDrawing = (event) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (event) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isEraser) {
      ctx.clearRect(x - 5, y - 5, 10, 10);
    } else {
      ctx.lineTo(x, y);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };
  const handleTouchMove = (event) => {
    if (!isDrawingRef.current) return;
    draw(event.touches[0]);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  return (
    <Card height="calc(100vh - 250px)">
      <div>
        <div style={{
              position:"absolute",

              bottom: 0, /* position the top  edge of the element at the middle of the parent */
              left: "50%", /* position the left edge of the element at the middle of the parent */
          
              transform: "translate(-50%, -50%)", 
                      
            }}>
          {/* <button onClick={toggleEraser}>
            {isEraser ? "Disable Eraser" : "Enable Eraser"}
          </button> */}
          <Button onClick={saveToLocalStorage}>ذخیره عکس</Button>
        </div>
        {true ? (
          <div
            style={{
              position:"absolute",

              top: "50%", /* position the top  edge of the element at the middle of the parent */
              left: "50%", /* position the left edge of the element at the middle of the parent */
          
              transform: "translate(-50%, -50%)", 
                      
            }}
          >
            <canvas
              ref={canvasRef}
              width="300"
              height="300"
              style={{ border: "1px solid black" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseOut={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        ) : (
          <p>No image available</p>
        )}
      </div>
    </Card>
  );
}

export default DrawImage;
