import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/slices/userSlices";
import axios from "axios";
import OAuth from "../components/OAuth";
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const value = useSelector((state) => state.user);
  console.log(value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function changeHandler(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function clickHandler(e) {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/log-in",
        formData
      );
      dispatch(signInSuccess(res));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.response));
    }
  }
  return (
    <div className="flex flex-col max-w-lg mx-auto">
      <h1 className="text-2xl text-center my-6">Log-In</h1>
      <form className="flex flex-col  gap-4 ">
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={changeHandler}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={changeHandler}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <button
          onClick={clickHandler}
          disabled={value.isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg"
        >
          {value?.isLoading ? "Loading..." : "Login"}
        </button>
        <OAuth/>
      </form>
      <div>
        <p>
          Don't have an account ?
          <span>
            <Link to="/sign-up" className="text-blue-700">
             signUp
            </Link>
          </span>
        </p>
        <p>{value.error?.data.message}</p>
      </div>
    </div>
  );
}

export default Login;
