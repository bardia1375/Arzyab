import Card from "components/common/Card";
import React, { useContext, useState } from "react";
import MapComponent from "../Dashboard/MapComponent";
import { Button } from "components/common";
import MyContext from "./context/MyContext";
import { errorMessage } from "services/toast";

function DetailJob({ setForm, item }) {
  const { myValue, setMyValue } = useContext(MyContext);
  const getUsers = JSON.parse(localStorage.getItem("NewUsers"));
  // const { index }=useContext(AppContext)
  const [Users,setUsers]=useState(getUsers)
  console.log("myValuemyValue", myValue);
  const changeHandler=()=>{

    console.log("getIdgetI12d",myValue.id);
    const NewUsers = JSON.parse(localStorage.getItem("NewUsers"));
    console.log("NewUsers",NewUsers[myValue?.id]);

if(NewUsers[myValue?.id].image?.length!==0){


    if (!Users) {
      const getUsers = JSON.parse(localStorage.getItem("users"));
      const newUsers = [...getUsers];
  
      newUsers[myValue.id] = { ...newUsers[myValue.id], State:1  };

  
      setUsers(newUsers);
      localStorage.setItem("NewUsers", JSON.stringify(newUsers));
      setForm(0);
    } else {
      const newUsers = [...Users];
  
      newUsers[myValue.id] = { ...newUsers[myValue.id], State:1  };

  
      setUsers(newUsers);
      localStorage.setItem("NewUsers", JSON.stringify(newUsers));
      setForm(0);
    }
}else{
  errorMessage("عکسی ثبت نشده است.")
}



  }
  const changeForm =() =>{
    if(myValue.location=="مصلی"){
      setForm(2)
    }else{
        errorMessage(`شما در لوکیشن ${myValue.location } قرار ندارید!`)
    }
    
  }
  return (
    <Card height="calc(100vh - 300px)">
      <MapComponent
        height="calc(100vh - 400px)"
        centerMap={[myValue.Latitude, myValue.Longitude]}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "32px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button onClick={changeForm}>ثبت خرابی</Button>
        
        <Button onClick={changeHandler}> پایان</Button>
        <Button onClick={()=>setForm(0)} bg="red"> بازگشت</Button>

      </div>
    </Card>
  );
}

export default DetailJob;
