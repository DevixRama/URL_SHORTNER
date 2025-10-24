import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { token } = useContext(AppContext);

    const linkClass = (isActive) => `block py-1 text-gray-700 hover:text-blue-600 flex mb-3 flex-col items-center ${isActive ? "border-b-2 border-blue-700" : ""}`;

    return (<nav className="bg-white shadow-md">
        <div className="max-w-6xl h-[10vh] mx-auto px-2">
            <div className="flex justify-between items-center py-4">
                <div className="text-2xl font-bold text-blue-900 flex gap-2"><span>URLShortner</span><i className="bx bxs-registered text-3xl"></i></div>
                <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700 focus:outline-none">☰</button>
                <div className={`md:flex md:items-center md:gap-6 ${open ? "block" : "hidden"}`}>
                    <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
                    <span className="text-[8px] font-medium px-2 py-1 rounded-full bg-green-200 text-green-800">UNLOCKED</span>
                    <span className="text-sm">Home</span>
                    </NavLink>
                    <NavLink to={token ? "/home" : "/login"} className={({ isActive }) => linkClass(isActive)}>
                    <span className={`text-[8px] font-medium px-2 py-1 rounded-full ${token ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{token ? "UNLOCKED" : "LOCKED"}</span>
                    <span className="text-sm">Advance Features</span>
                    </NavLink>
                    {token ? (<button onClick={() => navigate("/logout")} className="px-4 py-1 bg-red-800 text-white rounded hover:bg-red-900">Logout</button>) : (<div className="flex gap-3 mt-3 md:mt-0"><button onClick={() => navigate("/login")} className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Sign In</button><button onClick={() => navigate("/sign-up")} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button></div>)}
                </div>
            </div>
        </div>
    </nav>);
};

export default Navbar;
