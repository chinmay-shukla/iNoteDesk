import React, { useContext, useEffect, useState } from 'react'
import '../css/AddNote.css'
import Notecontext from '../context/noteContext'
import { useNavigate } from "react-router-dom";
import { alertContext } from '../context/alertContext';

const Notes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('token') === null && navigate("/signin")
  }, [])

  const context = useContext(Notecontext)
  const { setShowalert } = useContext(alertContext)

  const { setNotes, addnotes, Notes } = context

  const [Note, setNote] = useState({ _id: Math.floor(Math.random() * 1000), title: "", description: "", tag: "" })
  const onchange = e => setNote({ ...Note, [e.target.name]: e.target.value })

  const onsubmit = (e) => {
    e.preventDefault()
    if (Note.title.length >= 3 && Note.description.length >= 5) {
      addnotes(Note)
      setNotes([...Notes, Note])
      setShowalert({ alert: true, info: { level: "green", errors: "Note created sucessfully" } })
      navigate('/')
    } else setShowalert({ alert: true, info: { level: "danger", errors: "Note creation Unsucessfully" } })
  }

  return (

    <div className="container">
      <div className="page_login">

        <form className="page_login__form" onSubmit={onsubmit}>
          <h1 className="page_login__title">Add Notes</h1>

          <div className="page_login__inputs">
            <div className="page_login__box">
              <input type="name" placeholder="Title" required className="page_login__input" value={Note.title} minLength="3" name='title' onChange={onchange} />
            </div>

            <div className="page_login__box">
              <input type="name" placeholder="Description" required className="page_login__input" value={Note.description} minLength={"5"} name='description' onChange={onchange} />
            </div>

            <div className="page_login__box">
              <input type="name" placeholder="Tag" className="page_login__input" value={Note.tag} name='tag' onChange={onchange} />
            </div>
          </div>


          <input type="submit" className="page_login__button" value={"Add Note"} />
        </form>
      </div>
    </div>
  )
}

export default Notes