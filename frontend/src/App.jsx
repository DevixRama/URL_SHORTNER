import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import UserWrapper from './pages/UserWrapper'
import HomeLock from './pages/HomeLock'
import LogoutUser from './pages/LogoutUser'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<UserWrapper><HomeLock /></UserWrapper>} />
        <Route path="/logout" element={<UserWrapper><LogoutUser /></UserWrapper>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App