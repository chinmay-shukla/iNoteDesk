import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/Signup.css"
import noteContext from '../context/noteContext'
import { alertContext } from '../context/alertContext'

const Signup = (props) => {
  const { setAuthToken } = useContext(noteContext)
  const { setShowalert, setShowloading } = useContext(alertContext)

  const [error, setError] = useState({ alert: false, info: { level: "green", errors: "" } })

  useEffect(() => {
    setShowalert(error)

    setTimeout(() => {
      setError({ alert: false, info: { level: "", errors: "" } })
    }, error.alert ? 2000 : 0);
  }, [error.alert])

  const navigate = useNavigate()
  const { setLogin } = props.ui
  const [cred, setCred] = useState({ name: "", email: "", password: "" })
  const Onchange = e => setCred({ ...cred, [e.target.name]: e.target.value })


  const submit = async (e) => {
    e.preventDefault()
    setShowloading(true)
    const { name, email, password } = cred
    const url = 'https://i-notedesk.vercel.app'

    try {
      const response = await fetch(`${url}/api/auth/createuser`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (response.status !== 200) setShowloading(false)


      if (response.status === 400) {
        setError({ alert: true, info: { level: "red", errors: "Enter a valid Name, email, passwors" } })
      }

      if (response.status === 409) {
        setError({ alert: true, info: { level: "info", errors: "This email has Alredy been used." } })
      }

      const json = await response.json();

      if (json.error) {
        console.log("Some error occurs");
      }

      if (json.authToken) {
        try {
          localStorage.setItem('token', json.authToken);
          setAuthToken(json.authToken)
          navigate('/');

        } catch (error) {
          console.error("Error:", error);
        }
      }


    } catch (error) {

    }
  }
  return (
    <form className="sign-up-form" onSubmit={submit}>
      <div className="logo">
        <img src="./img/logo.png" alt="easyclass" />
        <h4>iNotebook</h4>
      </div>

      <div className="heading">
        <h2>Get Started</h2>
        <h6>Already have an account?</h6>
        <Link to='/signin' className="toggle" onClick={() => setLogin(false)} > Sign in</Link>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input type="text" name='name' minLength="4" className="input-field" placeholder="Name" onChange={Onchange} autoComplete='on' required />
        </div>

        <div className="input-wrap">
          <input type="email" name='email' className="input-field" placeholder="Email" onChange={Onchange} autoComplete='on' required />
        </div>

        <div className="input-wrap">
          <input type="password" name='password' minLength="4" className="input-field" placeholder="Password" onChange={Onchange} autoComplete="on" required />
        </div>

        <input type="submit" value="Sign Up" className="sign-btn" />

        <p className="text">
          By signing up, I agree to the
          <a href="#">Terms of Services</a> and
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </form>
  )
}

export default Signup