import React from 'react'
import { useNavigate } from "react-router-dom";

const Createnote = () => {
  const navigation = useNavigate()
  return (
    <div className="note" onClick={() => navigation("/addnotes")}>
      <div className="create">
        <i className="ri-add-circle-line"></i>
      </div>
    </div>
  )
}

export default Createnote