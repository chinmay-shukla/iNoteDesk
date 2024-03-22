import React, { useContext, useEffect } from 'react'
import noteContext from '../context/noteContext';
import { useNavigate } from 'react-router-dom';


const login = (props) => {
  const navigate = useNavigate()
  const { LoginUI, setLoginUI } = props.info
  const { getuserinfo, info } = useContext(noteContext)
  const { name, email } = info

  useEffect(() => {
    getuserinfo(); // Calling the function within useEffect
  }, []);


  const logout = () => {
    localStorage.removeItem('token')
    navigate("/signin")
  }

  return (
    <div className={`login ${LoginUI && "show-login"}`}>
      <form action="" className="login__form" onSubmit={e => e.preventDefault()}>
        <h2 className="login__title">Your Profile</h2>

        <div className="login__group">
          <label className="login__label">Your Name</label>
          <label className="login__label__strong">{name}</label>
        </div>

        <div className="login__group">
          <label className="login__label">Email</label>
          <label className="login__label__strong">{email}</label>
        </div>

        <button className='login__input' onClick={logout}>Log out</button>
      </form >

      <i className="ri-close-line login__close" onClick={() => setLoginUI(false)}></i>
    </div >
  )
}

export default login