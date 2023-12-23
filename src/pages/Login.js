import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/log-in",
        formData
      );
      navigate("/home");
      setError(null);
      setIsLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
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
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <div>
        <p>
          Don't have an account ?
          <span>
            <Link to="/sign-up" className="text-blue-700">
              SignUp
            </Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
