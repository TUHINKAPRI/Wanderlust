import React from "react";
import { FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom'
function Header() {
  return (
    <header className="bg-slate-200 flex justify-between items-center mx-auto p-3 ">
      <h1 className="text-2xl text-slate-600  ">WanderLust</h1>
      <form className="bg-slate-100 p-3 rounded-lg flex items-center">
        <input
          type="text"
          placeholder="serach"
          className="bg-transparent focus:outline-none "
        />
        <FaSearch className="text-slate-500" />
      </form>
      <ul className="flex gap-4">
        <Link to='/'>
        <li className="text-slate-700 hover:underline" >Home</li>
        </Link>
        <Link to='/about'>
        <li className="text-slate-700 hover:underline">About</li>
        </Link>
        <Link to='/log-in'>
        <li className="text-slate-700 hover:underline">LogIn</li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
