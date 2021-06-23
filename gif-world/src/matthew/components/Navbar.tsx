import { useState } from 'react'
import { NavLink } from "react-router-dom"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const links = [
        {
            id: 1,
            path: "/",
            text: "Search GIFs",
        },
        {
            id: 2,
            path: "/saved",
            text: "Saved GIFs"
        },
        {
            id: 3,
            path: "/todo",
            text: "To-do",
        }, 
        {
            id: 4,
            path: "/api-practice",
            text: "Api"
        }
    ]
    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }
    const closeMenu = () => {
        setNavbarOpen(false)
    }
    return (
        <nav className="navBar">
            <button onClick={handleToggle}>
                {navbarOpen ? (
                <MdClose style={{ color: "#fff", width: "20px", height: "20px" }} /> 
                ) : (<FiMenu style={{ color: "#7b7b7b", width: "20px", height: "20px" }}/>
                )} 
                </button>
            <ul className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>
                {links.map(link => {
                    return <li key={link.id}>
                        <NavLink 
                            to={link.path} 
                            activeClassName="active-link" 
                            onClick={() => closeMenu()}
                            exact
                            >
                            {link.text}
                            </NavLink>
                        </li>
                })}
            </ul>
        </nav>
    )
}
export default Navbar