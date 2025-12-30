import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const LogoutUser = () => {

  const navigate = useNavigate()
  const { token, setToken } = useContext(AppContext)

  useEffect(() => {

    axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {}, {
      headers: {
        Authorization:
          `bearer ${token}`
      }
    }).then((response) => {
      if (response.data.success === true) {
        localStorage.removeItem('token')
        setToken(false)
        navigate('/')
      }
    }).catch((err) => {
      console.error(err);
      navigate('/');
    })

  }, [])



  return (
      <div className="flex items-center justify-center max-h-[90vh]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
  )
}

export default LogoutUser