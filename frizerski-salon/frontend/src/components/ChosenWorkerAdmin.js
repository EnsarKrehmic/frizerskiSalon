import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ChosenWorkerAdmin(){
    const {id}=useParams();
    const [worker, setWorker] = useState(null);
    const [questions, setQuestions] = useState(null);

    useEffect(()=>{
        axios.get("http://localhost:3307/get-worker/"+id)
        .then(response=>setWorker(response.data[0]))
        .catch(error=>console.error("Error fetching worker information", error));
    }, [id]);

    useEffect(()=>{
        axios.get("http://localhost:3307/worker-questions/"+id)
        .then(response=>setQuestions(response.data))
        .catch(error=>console.error("Error fetching questions information", error));
    }, [id]);

    const handleDeleteQuestion=async(id)=>{
        try{
            await axios.delete("http://localhost:3307/admin/delete-question/"+id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    if(!worker){
        return <div>Učitavanje...</div>;
    }

    if(!questions){
        return <div>Učitavanje...</div>;
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning">
            <div className="bg-white p-3 rounded w-80 m-5">
                <Link to={"/admin"} className="btn btn-default border w-100 bg-light text-decoration-none">Nazad</Link>
                <h1>Podaci o radniku</h1>
                <h2>Ime: {worker.name}</h2>
                <p>Opis: {worker.description}</p>
                <p>Vrsta: {worker.type}</p>
                <h2>Pitanja:</h2>
                {questions.length === 0 ? (
                    <p>Nema dostupnih pitanja.</p>
                ) : (
                        questions.map((data, i) => (
                        <div key={i}>
                            <p>ID pitanja: {data.id}</p>
                            <p>{data.content}</p>
                            <p>Postavljeno od strane: {data.nickname}</p>
                            <button onClick={e=>handleDeleteQuestion(data.id)} className="btn btn-danger">Ukloni</button>
                        </div>
                    ))
                )}
            </div>
            
        </div>
    )
}

export default ChosenWorkerAdmin;