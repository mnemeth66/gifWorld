import React from "react";
import ReactDom from "react-dom";
import "./header.css";
import { SiManjaro } from "react-icons/si";

const Header = () => {
    return (
        <div className="header">
            <SiManjaro className="logoIcon"/>
            <h1>Gif World</h1>
        </div>
    );
}

export default Header;