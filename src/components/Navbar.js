import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import sidebarConfig from "./SidebarConfig";
import './Navbar.css';
import { Box } from "@material-ui/core";
import { IconContext } from 'react-icons'

function Navbar() {

    return (
        <>
        <IconContext.Provider value={{ color: '#fff'}}>
            <nav className='nav-menu'>
                <ul className='nav-menu-items'>
                    <br />
                    <li><img src={process.env.PUBLIC_URL + "/Casita.png"} alt="Logo" style={{ width: 100,
                    height: 100, marginLeft: 70}}/></li>
                {sidebarConfig.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span> {item.title}</span>
                            </Link>
                        </li>
                    )
                })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
