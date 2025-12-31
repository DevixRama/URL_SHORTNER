import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { token } = useContext(AppContext);

    const linkClass = (isActive) =>
        `flex gap-2 m-2 items-center md:flex-row md:items-center md:gap-2 py-1 text-gray-700 hover:text-blue-600 ${isActive ? "border-b-2 border-blue-700" : ""
        }`;

    return (
        <nav className="border-b border-gray-300">
            <div className="max-w-6xl mx-auto py-2 px-8">
                <div className="flex justify-between items-center py-3 md:py-2 relative">
                    <div className="flex items-center gap-2 text-2xl font-bold text-blue-950">
                        <span>URLShortner</span>
                        <i className="bx bxs-registered text-3xl"></i>
                    </div>

                    <button onClick={() => setOpen(!open)} className="md:hidden text-gray-800 text-3xl focus:outline-none hover:scale-105">☰</button>

                    <div className={`${open ? "fixed inset-0 bg-gray-100 bg-opacity-95 z-50 flex flex-col items-center justify-center md:static md:bg-transparent md:flex-row md:justify-start md:gap-6" : "hidden md:flex md:items-center md:gap-6"}`}>
                        {open && <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-3xl md:hidden text-gray-800 focus:outline-none">×</button>}

                        <NavLink to="/" className={({ isActive }) => linkClass(isActive)} onClick={() => setOpen(false)}>
                            <span className="text-sm mt-1 md:mt-0">
                                <svg className="w-8 h-8 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z" />
                                </svg>
                            </span>
                            <span className="text-[8px] font-medium p-1 rounded-full bg-green-100 text-green-800">UNLOCKED</span>
                        </NavLink>

                        <NavLink to={token ? "/home" : "/login"} onClick={(e) => { if (!token) { e.preventDefault(); toast.error("Please login to UNLOCK this feature."); } setOpen(false); }} className={({ isActive }) => linkClass(isActive)}>

                            <span className="text-sm mt-1 md:mt-0">Advance Features</span>
                            <span className={`text-[8px] font-medium p-1 rounded-full ${token ? "bg-green-200 text-green-800" : "bg-red-100 text-red-800"}`}>{token ? "UNLOCKED" : <svg className="w-4 h-4 md:w-3 md:h-3 text-red-800" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 1a5 5 0 0 0-5 5v5H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v5H9V6z" />
                            </svg>
                            }</span>

                        </NavLink>

                        {token ? <button onClick={() => navigate("/logout")} className="mt-3 md:mt-0 px-4 py-1 border border-[#9d3533] text-[#000] dark:text-[#e06f6b] hover:bg-[#DE3B37] hover:text-white rounded transition duration-300">Logout</button> : <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0">
                            <button onClick={() => { navigate("/login"); setOpen(false); }} className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Sign In</button>
                            <button onClick={() => { navigate("/sign-up"); setOpen(false); }} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
                        </div>}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
