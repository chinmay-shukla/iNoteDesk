import React, { useContext, useState } from 'react'
import Notecontext from '../context/noteContext'
import { Link } from "react-router-dom";
import { alertContext } from '../context/alertContext';

const Note = () => {
  const context = useContext(Notecontext)
  const { Notes, serachnotes, deletenotes } = context
  const { setShowalert } = useContext(alertContext)


  const notedelete = (data) => {
    let delnote = confirm("Are you sure you want to delete this note ⬇ ⬇")
    if (delnote) {
      deletenotes(data._id)
      setShowalert({ alert: true, info: { level: "green", errors: "Note deleted sucessfully" } })
    }
  }

  return (
    (serachnotes.length === 0 ? Notes : serachnotes).map((data) => {
      return (
        <div className="note" key={data._id}>
          <span className="title">{data.title}</span>
          <div className="description">{data.description}</div>

          <div className="icon">
            <Link to={`/editnotes/${data._id}`} >
              <i className="ri-pencil-line editicon"></i>
            </Link>
            <i className="ri-delete-bin-line deleteicon" onClick={() => notedelete(data)}></i>
          </div>
        </div >
      )
    })
  )

}

export default Note