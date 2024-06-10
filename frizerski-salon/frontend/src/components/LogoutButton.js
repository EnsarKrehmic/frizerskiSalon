import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutButton(){

    const navigate=useNavigate();

    const handleLogout=()=>{
        try {
            axios.get('http://localhost:3307/logout');
            console.log('Uspješno ste se odjavili.');
            navigate("/main");
            window.location.reload();
        } catch (error) {
            console.error('Odjava neuspješna:', error.message);
        }
    }

    return(
        <button onClick={handleLogout} className="btn btn-danger m-2">Odjava</button>
    )
}

export default LogoutButton;