import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/Signup.css"
import Signin from './Signin'
import Signup from './Signup'

const Credentialvalidation = (props) => {
  const [Login, setLogin] = useState(props.signinUI)

  document.title = Login ? "iNotedesk - Log in to your account" : "iNotedesk - Create a account"

  return (
    <main className={`${Login && "sign-up-mode"}`}>
      <div className="form__box">
        <div className="form__inner-box">
          <div className="forms-wrap">
            <Signin ui={{ Login, setLogin }} />
            <Signup ui={{ Login, setLogin }} />

          </div>

          <div className="carousel">
            <div className="images-wrapper">
              <img src="./img/image1.png" className="image img-1 show" alt="" />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div className="text-group">
                  <h2>{!Login ? "Log In" : "Sign Up"} to your account</h2>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div >
    </main >
  )
}

export default Credentialvalidation