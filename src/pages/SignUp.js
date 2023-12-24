import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";
function SignUp() {
  let navigate=useNavigate()
  let [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  let [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    console.log(formData);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/user/sign-up",
        formData
      );
      console.log(res);
      setIsLoading(false);
      setError(null)
      navigate('/log-in')
    } catch (err) {
      console.log(err.response.data);

      setError(err.response.data.messaage);
      setIsLoading(false);
    }
  }
  console.log(error);

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
        <button
          className="bg-slate-700 text-white p-3 rounded-lg"
          disabled={isLoading}
          onClick={clickHandler}
        >
          {isLoading ? "Loading..." : "SignUp"}
        </button>
        <OAuth/>
      </form>
      <div className="flex mt-5">
        <p>Have a account?</p>
        <Link to="/log-in">
          <p className="text-blue-700">Login</p>
        </Link>
      </div>
      {error ? <p className="bg-red-800">{error}</p> : ""}
    </div>
  );
}

export default SignUp;
