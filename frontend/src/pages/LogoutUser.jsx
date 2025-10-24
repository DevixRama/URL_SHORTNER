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
    }).catch((err) =>{
      console.error(err);
      navigate('/');
    })

  }, [])



  return (
    <>LogoutUser</>
  )
}

export default LogoutUser