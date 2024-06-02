import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import { useParams, useNavigate } from "react-router-dom";
import './Date.css';

function WorkerRegister(){
    const {id}=useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    axios.defaults.withCredentials=true;
    const navigate=useNavigate();

    const handleSubmit=(event)=>{
        const user_id=userInfo.id;
        event.preventDefault();
        axios.post("http://localhost:3307/worker-register/"+id, {startDate, endDate, user_id})
        .then(res=>{
            if (res.data==="OK"){
                alert("Radnik je uspješno rezervisan");
                navigate(`/home`);
            }
            else{
                alert("Rezervacija radnika neuspješna.");
            }
        })
        .catch(err=>console.log(err));
    }

    useEffect(() => {
        axios.get("http://localhost:3307/api/user")
            .then(response => setUserInfo(response.data))
            .catch(error => console.error("Error fetching user information", error));
    }, []);

    if (!userInfo) {
        return <div>Učitavanje...</div>;
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Izaberite vrijeme za termin:</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Početak:</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="mb-3">
                        <label>Kraj:</label>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </div>
                    <button type="submit" className="btn btn-success w-100 mb-2">Rezervišite radnika</button>
                </form>
            </div>
        </div>
    )
}

export default WorkerRegister;