import React from "react"
import Sanskrit from "../Assests/Images/Sanskrit-logo.jpg"
import "../CSS/Header.css"

const Header = () => {
    return(
        <div className = "header-row">
            <div className = "header-image">
                    <img src = {Sanskrit} alt = "Sanskrit logo" id = "sans1"/>
            </div>
            <div className = "header-title">
                <h1>Sanskrit Wordnet</h1>
            </div>
        </div>
    )
}

export default Header;