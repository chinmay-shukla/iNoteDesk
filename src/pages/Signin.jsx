import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "../css/Signup.css"
import noteContext from '../context/noteContext'
import { alertContext } from '../context/alertContext'

const Signin = (props) => {
  const { setAuthToken } = useContext(noteContext)
  const { setShowalert, setShowloading } = useContext(alertContext)

  const [error, setError] = useState({ alert: false, info: { level: "green", errors: "" } })

  useEffect(() => {
    setShowalert(error)

    setTimeout(() => {
      setError({ alert: false, info: { level: "", errors: "" } })
    }, 2000);
  }, [error.alert])


  const navigate = useNavigate()
  const { setLogin } = props.ui
  const [cred, setCred] = useState({ email: "", password: "" })
  const Onchange = e => setCred({ ...cred, [e.target.name]: e.target.value })


  const submit = async (e) => {
    e.preventDefault()
    setShowloading(true)
    const { email, password } = cred
    const url = 'https://i-notedesk.vercel.app'

    try {
      const response = await fetch(`${url}/api/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.status !== 200) setShowloading(false)

      if (response.status === 400) {
        setError({ alert: true, info: { level: "red", errors: "Enter a valid email or passwors" } })
      }
      if (response.status === 401) {
        setError({ alert: true, info: { level: "danger", errors: "Please login with correct credential" } })
      }

      if (response.status === 200) {
        const json = await response.json();
        if (json.authToken) {
          try {
            localStorage.setItem('token', json.authToken);
            setAuthToken(json.authToken)
            navigate('/');

          } catch (error) {
            // console.error("Error:", error);
          }
        }

        if (json.error) {
          return setError({ alert: true, info: { level: "red", errors: "There seem to be a error" } })
        }
      }
    } catch (error) {

    }
  }
  return (
    <form className="sign-in-form" onSubmit={submit}>
      <div className="logo">
        <img src="./img/logo.png" alt="easyclass" />
        <h4>Inotebook</h4>
      </div>

      <div className="heading">
        <h2>Welcome Back</h2>
        <h6>Not registred yet?</h6>
        <Link to='/signup' className="toggle" onClick={() => setLogin(true)} > Sign up</Link>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input type="email" minLength="4" placeholder="Email" name='email' className="input-field" required onChange={Onchange} />
        </div>

        <div className="input-wrap">
          <input type="password" minLength="4" name='password' placeholder='Password' className="input-field" required onChange={Onchange} />
        </div>

        <input type="submit" value="Sign In" className="sign-btn" />

        <p className="text">
          Forgotten your password or you login datails?
          <a href="#">Get help</a> signing in
        </p>
      </div>
    </form>
  )
}

export default Signin