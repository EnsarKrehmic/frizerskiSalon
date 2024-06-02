import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ChosenWorker(){
    const {id}=useParams();
    const [worker, setWorker] = useState(null);
    const [questions, setQuestions] = useState(null);

    useEffect(()=>{
        axios.get("http://localhost:8081/get-worker/"+id)
        .then(response=>setWorker(response.data[0]))
        .catch(error=>console.error("Error fetching worker information", error));
    }, [id]);

    useEffect(()=>{
        axios.get("http://localhost:3307/worker-questions/"+id)
        .then(response=>setQuestions(response.data))
        .catch(error=>console.error("Error fetching questions information", error));
    }, [id]);

    if(!worker){
        return <div>Učitavanje...</div>;
    }

    if(!questions){
        return <div>Učitavanje...</div>;
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning">
            <div className="bg-white p-3 rounded w-80 m-5">
                <Link to={"/main"} className="btn btn-default border w-100 bg-light text-decoration-none">Nazad</Link>
                <h1>Detalji o radniku</h1>
                <h2>Ime: {worker.title}</h2>
                <p>Opis: {worker.description}</p>
                <p>Vrsta: {worker.type}</p>
                <Link to={`add-question/${id}`} className="btn btn-success">Dodajte pitanje</Link>
                <h2>Pitanja:</h2>
                {questions.length === 0 ? (
                    <p>Nema dostupnih pitanja.</p>
                ) : (
                        questions.map((data, i) => (
                        <div key={i}>
                            <p>ID pitanja: {data.id}</p>
                            <p>{data.content}</p>
                            <p>Postavljen od strane: {data.nickname}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ChosenWorker;