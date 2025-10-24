import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const UserWrapper = ({ children }) => {


    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('token')

    const navigate = useNavigate()
    const { user, setUser } = useContext(AppContext)



    useEffect(() => {
        if (!token) {
            navigate("/login")
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {

            if (response.data.success === true) {
                setUser(response.data.User)
                setIsLoading(false)
            } else {
                navigate('/login')
            }
        }).catch(err => {
            navigate('/login')
        })
    }, [token])


     if (isLoading) {
        return (
            <div>Loading...</div>
        )
    } 

    return (
        <>{children}</>
    )
}

export default UserWrapper