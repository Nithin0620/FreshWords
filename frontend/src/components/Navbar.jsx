import React from 'react'
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

const Navbar = ({dark,setDark}) => {



  return (
    <div className={`flex justify-between mx-5 my-2 border-b-0 shadow-md`}>
      <div>
         <h1>
            FreshWords
         </h1>
      </div>
      <div>
         <button onClick={()=>setDark(!dark)}>
            {
               dark?<FaSun/> : <FaMoon/>
            }
         </button>
      </div>
    </div>
  )
}

export default Navbar
