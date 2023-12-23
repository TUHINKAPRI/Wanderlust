import React, { useState } from "react";
import { Link } from "react-router-dom";
function SignUp() {
  let[formData,setFormData]=useState({username:'',password:'',email:''})
  function changeHandler(e) {
    setFormData((prev)=>{
      return({
        ...prev,[e.target.name]:e.target.value
      })
    })
  }
  function clickHandler(e){
    e.preventDefault()
    console.log(formData);
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl text-center my-6">Sign-Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          name="username"
          value={formData.username}
          onChange={changeHandler}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          name="email"
          value={formData.email}
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 focus:outline-none rounded-lg"
          name="password"
          value={formData.password}
          onChange={changeHandler}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg" onClick={clickHandler}>
          Sign-Up
        </button>
      </form>
      <div className="flex mt-5">
        <p>Have a account?</p>
        <Link to="/login">
          <p className="text-blue-700">Login</p>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
