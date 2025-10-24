import React, { createContext, useState } from 'react'
import axios from 'axios'

export const AppContext = createContext()



const AppProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token') || false);
    const [user, setUser] = useState(null)
    const [userAllUrls, setUserAllUrls] = useState([])


    const fetchAllUrls = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/urls`, {
            headers: {
                Authorization:
                    `bearer ${token}`
            }
        })

        const data = response.data
        if (data.success === true) {
            setUserAllUrls(data.urls)
        }
    }


    const value = {
        user, setUser,
        userAllUrls, setUserAllUrls, fetchAllUrls,
        token, setToken
    }


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider