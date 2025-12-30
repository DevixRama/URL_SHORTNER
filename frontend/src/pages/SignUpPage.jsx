import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";



const SignUpPage = () => {



  const {setUser, setToken } = useContext(AppContext)
  const navigate = useNavigate()


  const [showBtn, setShowBtn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      if (!username || !email || !password) {
        return toast.error('All fields are required')
      }
      const userData = { username, email, password }
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, userData)
      const data = response.data

      if (data.success === true) {
        setUser(data.user)
        localStorage.setItem("token", data.token)
        setToken(data.token)
        toast.success(data.message)
        navigate('/home')

        setUsername('')
        setEmail('')
        setPassword('')
      } else {
        toast.error(data.message || "Something went wrong")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.")
    }

  }

  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-50">
      <div className="bg-white px-8 py-10 rounded border w-[500px]">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Sign Up</h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text" value={username} onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex border border-gray-300 rounded px-3 py-2">
              <input type={showBtn ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full focus:outline-none" />
              {
                showBtn
                  ? <i className='bx bx-show' onClick={() => setShowBtn(!showBtn)}></i>
                  : <i className='bx bx-hide' onClick={() => setShowBtn(!showBtn)}></i>
              }
            </div>
          </div>

          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link className="text-blue-600 font-medium hover:underline" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
