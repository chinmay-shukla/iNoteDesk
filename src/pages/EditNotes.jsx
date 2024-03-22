import React, { useContext, useEffect, useState } from 'react'
import '../css/AddNote.css'
import Notecontext from '../context/noteContext'
import { useNavigate, useParams } from "react-router-dom";
import { alertContext } from '../context/alertContext';



const EditNotes = () => {
  const navigate = useNavigate();
  const { setShowalert } = useContext(alertContext)

  useEffect(() => {
    localStorage.getItem('token') === null && navigate("/signin")
    document.title = "iNotedesk - Edit Your Notes"
  }, [])

  const { id } = useParams();

  const context = useContext(Notecontext)

  const { Notes, editnotes } = context

  const [Note, setNote] = useState({ title: "", description: "", tag: "" })



  useEffect(() => {
    const noteUpdate = Notes.find(data => data._id === id);
    if (noteUpdate) {
      setNote({
        title: noteUpdate.title,
        description: noteUpdate.description,
        tag: noteUpdate.tag
      });
    }

  }, [])
  const onchange = e => setNote({ ...Note, [e.target.name]: e.target.value })

  const onsubmit = (e) => {
    e.preventDefault()

    if (Note.title.length >= 3 && Note.description.length >= 5) {
      editnotes(id, Note)
      setShowalert({ alert: true, info: { level: "green", errors: "Note edited sucessfully" } })
      navigate('/')
    }

  }

  return (

    <div className="container">
      <div className="page_login">

        <form className="page_login__form" onSubmit={onsubmit}>
          <h1 className="page_login__title">Edit Notes</h1>

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


          <input type="submit" className="page_login__button" value={"Submit"} />
        </form>
      </div>
    </div>
  )
}

export default EditNotes