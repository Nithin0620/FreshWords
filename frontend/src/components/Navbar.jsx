import React from 'react';
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ dark, setDark }) => {
  return (
    <nav
      className={`flex items-center justify-between border-b border-violet-400 px-6 py-3 shadow-md w-full transition-colors duration-300 ${
        dark ? "bg-[#2b1f27]" : "bg-[#EFE5CB]"
      }`}
    >
      <h1
        className={`text-xl font-bold transition-colors duration-300 ${
          dark ? "text-white" : "text-[#2b1f27]"
        }`}
      >
        FreshWords
      </h1>

      <button
        onClick={() => setDark(!dark)}
        className={`p-2 rounded-full transition-all duration-300 hover:scale-105 ${
          dark
            ? "bg-gray-700 text-white"
            : "bg-[#EFE5CB] text-[#2b1f27]"
        }`}
        aria-label="Toggle dark mode"
      >
        {dark ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
