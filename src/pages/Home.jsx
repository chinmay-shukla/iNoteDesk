import React, { useContext, useEffect, useState } from 'react'
import Note from '../components/Note'
import Notecontext from '../context/noteContext'
import Createnote from '../components/Createnote'
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate()
  const context = useContext(Notecontext)
  const { getallnotes } = context

  useEffect(() => {
    localStorage.getItem('token') === null || localStorage.getItem('token') === '' ? navigate("/signin") : getallnotes()
  }, [])



  return (

    <div>
      <div className="container">
        <h1 className='h1'>All Notes</h1>
        <div className="notes">
          <Note />
          <Createnote />
        </div>
      </div>
    </div>
  )
}

export default Home