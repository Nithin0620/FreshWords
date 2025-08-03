import React, { useEffect, useState } from 'react'
import Navbar from "./components/Navbar"
import MainUI from './components/MainUI'

const App = () => {

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [dark,setDark] = useState(isDarkMode);
  useEffect(()=>{
    localStorage.setItem("dark",dark);
  },[dark])
  
  return (
    <div>
      
      <MainUI dark={dark} setDark={setDark}/>
    </div>
  )
}

export default App
