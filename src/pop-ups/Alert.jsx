import React, { useContext } from 'react'
import "../css/alerts.css"
import { alertContext } from '../context/alertContext'

const Alert = ({ error }) => {
  const { level, errors } = error
  const { setShowalert } = useContext(alertContext)


  return (
    <div className={`${level === "green" ? "success" : level === "info" ? "info" : level === "red" ? "warning" : level === "danger" && "danger"} alert`}>
      <div className="content">
        <div className="alerticon">
          <svg width="50" height="50" id="Layer_1" version="1.1" viewBox="0 0 128 128" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle fill="#fff" cx="64" cy="64" r="64" /></g><g><path fill="#3EBD61" d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z" /></g></svg>
        </div>
        <p className='alert_p'>{errors}</p>
      </div>
      <button className="close" onClick={() => setShowalert({ alert: false })}>
        <svg height="18px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="18px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" /></svg>
      </button>
    </div >
  );
}

export default Alert