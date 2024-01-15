import { useState } from "react"
import { useNavigate } from "react-router"

// Services
import { INITIAL_VALUE } from "services/input-initial"

// Components
import { LoginLayout } from "components/layout"
import { Typography } from "components/common"

// Styles
import { LoginStyles, ResetStyles } from "assets/styles/auth"

// Images
import Tikport from "assets/images/auth/tikport-fa.svg"
import Avatar from "assets/images/auth/avatar.svg"
import Tick from "assets/images/auth/tick-secondary.svg"
import { useDispatch } from "react-redux";
import { passwordRecovery } from "./../Module";

const Reset = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [isConfirmed, setIsConfirmed] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState({
    ...INITIAL_VALUE,
  })

  const phoneNumberChangeHandler = event => {
    setPhoneNumber({ value: event.target.value, isValid: event.target.value.length > 0 })
  }

  const submitHandler = event => {
    event.preventDefault()
    if (!phoneNumber.isValid) return

    const user = new FormData()

    user.append("UserName", phoneNumber.value);
    dispatch(passwordRecovery(user))
    setIsConfirmed(true)
    setTimeout(() => {
      navigate("/login")
      setIsConfirmed(false)
    }, 3000)
  }

  let renderEl
  if (isConfirmed) {
    renderEl = (
      <LoginStyles.Container>
        <ResetStyles.ConfirmContainer>
          <LoginStyles.Title>
            رمز عبور شما با موفقیت تغییر پیدا کرد و به شمارۀ همراه شما فرستاده شد
          </LoginStyles.Title>
          <img src={Tick} alt="Tick" />
        </ResetStyles.ConfirmContainer>
      </LoginStyles.Container>
    )
  } else {
    renderEl = (
      <LoginStyles.Container>
        <LoginStyles.Header>
          <img src={Tikport} alt="Tikport" />
        </LoginStyles.Header>
        <ResetStyles.ResestContainer onSubmit={submitHandler}>
          <LoginStyles.Title>بازنشانی رمز عبور</LoginStyles.Title>
          <LoginStyles.InputGroup>
            <img src={Avatar} alt="Avatar" />
            <input
              type="text"
              placeholder="شماره همراه خود را وارد کنید"
              value={phoneNumber.value}
              onChange={phoneNumberChangeHandler}
            />
          </LoginStyles.InputGroup>
          <div style={{ margin: "20px auto" }}>
            <LoginStyles.Button>
              <Typography>ثبت</Typography>
            </LoginStyles.Button>
          </div>
        </ResetStyles.ResestContainer>
      </LoginStyles.Container>
    )
  }

  return <LoginLayout>{renderEl}</LoginLayout>
}

export default Reset
