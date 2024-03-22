import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'
import Note from './Note'

const Search = (props) => {
  const { SearchUI, setSearchUI } = props.info
  const { Notes, setSearchnote } = useContext(noteContext)


  const filternotes = (keyword) => {
    const data = Notes.filter(note => note.title.includes(keyword));
    setSearchnote(data);
  }



  return (
    <div className={`search ${SearchUI && "show-search"}`}>
      <form action="" className="search__form" onSubmit={e => e.preventDefault()}>
        <i className="ri-search-line search__icon"></i>
        <input type="search" placeholder="What are you looking for?" className="search__input" onChange={e => filternotes(e.target.value)} />
      </form>

      <i className="ri-close-line search__close" onClick={() => SearchUI && setSearchUI(false)}></i>
    </div>
  )
}

export default Search