import React from 'react'
import './main.css'
import { NavLink, useNavigate, useNavigation, useParams } from "react-router-dom"
export default function Main() {
    return (
        <div>
            <div className="app-container">
                <h1>Form Navigation</h1>
                <div className="nav-buttons">
                    <NavLink to={"/survey-form"}><button className="nav-button">Survey Form</button></NavLink>
                    <NavLink to={"/job-application-form"}><button className="nav-button">Job Application Form</button></NavLink>
                    <NavLink to={"/form"}><button className="nav-button">Form</button></NavLink>
                </div>
            </div>
        </div>
    )
}
