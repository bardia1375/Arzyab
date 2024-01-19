import Card from 'components/common/Card'
import React, { useContext } from 'react'
import MyContext from './context/MyContext';
import { Button } from 'components/common';

function ShowImage({setForm,setselected}) {
    const { NewImage } = useContext(MyContext);
    const handleBack=()=>{
        setForm(0)
        setselected("درخواست‌های انجام شده")
    }
 console.log("NewImage",NewImage);
  return (<div style={{position:"relative"}}>
    <Card height="calc(100vh - 300px)">
        <img src={NewImage} width="100%" height="100%"/>
     
    </Card>
    <Button onClick={handleBack} style={{position:"absolute",left:0, marginTop:"8px"}}>بازگشت</Button></div>
    )
}

export default ShowImage