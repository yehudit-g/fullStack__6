import React, { useState } from "react"
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { BsPerson, BsFillPinMapFill } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import "../Css/info.css";

export default function Info() {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? undefined)


    return (
        <div className="pageInfo">
            <h1><BsPerson />{currentUser.name} ({currentUser.username})</h1>
            <h2><AiOutlinePhone />{currentUser.phone}</h2>
            <h2><AiOutlineMail />{currentUser.email}</h2>
            <h2><TbWorld />{currentUser.website}</h2>
            <h2><BsFillPinMapFill />{currentUser.address_suite}, {currentUser.address_street}, {currentUser.address_city}, {currentUser.address_zipcode}</h2>
        </div>
    )
}