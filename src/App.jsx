import React, { useContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from "./pages/Home"
import Notes from "./pages/AddNotes"
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import NoteState from './context/NoteState'
import EditNotes from './pages/EditNotes';
import Credentialvalidation from './pages/Credentialvalidation';
import Alert from './pop-ups/Alert';
import { alertContext } from './context/alertContext';
import { themeContext } from './context/themeContext';
import Loading from './pop-ups/Loading';

const App = () => {
  const { setShowalert, showalert, showloading } = useContext(alertContext)
  const { theme } = useContext(themeContext)

  useEffect(() => {
    document.body.style.background = theme === "dark" ? 'url(dark-bg.jpg)' : 'url(bg-image.png)'
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
  }, [theme])

  useEffect(() => {
    setTimeout(() => {
      setShowalert({ alert: false })
    }, showalert.alert === true ? 2000 : 0);
  }, [showalert.alert])

  return (
    <div className={theme === 'dark' ? "darkTheme" : "lightTheme"}>
      <BrowserRouter>
        <NoteState >
          {showloading && <Loading />}
          {showalert.alert && <Alert error={showalert.info} />}
          <Routes>
            <Route path="/" element={<><Navbar /><Home /></>} />
            <Route path="/addnotes" element={<><Navbar /><Notes /></>} />
            <Route path="/editnotes/:id" element={<><Navbar /><EditNotes /></>} />
            <Route path="/signin" element={<Credentialvalidation signinUI={false} />} />
            <Route path="/signup" element={<Credentialvalidation signinUI={true} />} />
          </Routes>
        </NoteState>
      </BrowserRouter>
    </div>
  )
}

export default App