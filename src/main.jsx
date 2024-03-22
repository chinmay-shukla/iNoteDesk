import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import './css/darkmode.css'
import AlertState from './context/alertContext.jsx'
import ThemeState from './context/themeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertState>
      <ThemeState >
        <App />
      </ThemeState>
    </AlertState>
  </React.StrictMode>,
)
