import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";

function WorkerHistory(){
    const {id}=useParams();
    const [workerRegisters, setWorkerRegisters] = useState(null);
    
    
    axios.defaults.withCredentials=true;

    useEffect(()=>{
        axios.get("http://localhost:3307/api/get-worker-registers/"+id)
        .then(response=>setWorkerRegisters(response.data))
        .catch(error=>console.error("Error fetching user information", error));
    }, [id]);

    if (!workerRegisters){
        return <div>Učitavanje...</div>;
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning">
            <div className="bg-white p-3 rounded w-100 m-5">
                <h1 className="text-center">Historija radnika</h1>
                <Link to={"/main"} className="btn btn-success border w-20 text-decoration-none">Nazad</Link>
                <div className="w-80 bg-white-rounded">
                {workerRegisters.length === 0 ? (
                    <p>Niste zakazali nijednog radnika.</p>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ime</th>
                                    <th>Početak</th>
                                    <th>Kraj</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workerRegisters.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.name}</td>
                                        <td>{data.start_date}</td>
                                        <td>{data.end_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WorkerHistory;