import React, {useState} from "react"
import { NavLink, Outlet, Link } from "react-router-dom"

import "../Css/MainPage.css";


export default function UserLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)

    return (
        <>
            <nav className="mainNav">
                <h2>{currentUser.name}:</h2>   
                {/* <NavLink
                    className={"navLink"}
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    home
                </NavLink> */}

                <NavLink
                    className={"navLink"}
                    to="albums"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Albums
                </NavLink>

                <NavLink
                    className={"navLink"}
                    to="posts"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Posts
                </NavLink>
                
                <NavLink
                    className={"navLink"}
                    to="todos"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Todos
                </NavLink>

                <NavLink
                    className={"navLink"}
                    to="info"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Info
                </NavLink>

                <NavLink
                    className={"navLink"}
                    to="../../login"
                    onClick={() => { if(localStorage.getItem('currentUser')) localStorage.removeItem('currentUser')}}
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Logout
                </NavLink>

            </nav>
            
 
            <Outlet />

            <footer>&#169; rivki & Tirtza 2023</footer>
        </>
    )
}