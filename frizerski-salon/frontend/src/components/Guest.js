import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Guest(){
    const [userInfo, setUserInfo] = useState(null);
    const [workers, setWorkers] = useState(null);

    axios.defaults.withCredentials=true;

    useEffect(()=>{
        axios.get("http://localhost:3307/api/get-users")
        .then(response=>setUserInfo(response.data))
        .catch(error=>console.error("Error fetching user information", error));
    }, []);

    useEffect(()=>{
        axios.get("http://localhost:3307/api/get-workers")
        .then(response=>setWorkers(response.data))
        .catch(error=>console.error("Error fetching user information", error));
    }, []);

    if (!userInfo) {
        return <div>Učitavanje...</div>;
    }

    if (!workers) {
        return <div>Učitavanje...</div>;
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning">
            <div className="bg-white p-3 rounded w-100 m-5">
                <h1 className="text-center">Dobrodošli na Frizerski salon</h1>
                <p className="text-center">Zdravo, gost!</p>
                <div className="d-flex justify-content-center align-items-center">
                    <Link to={"/login"} className="btn btn-primary m-2">Prijava</Link>
                </div>
                <h2 className="text-center">Ponuda svih radnika:</h2>
                <div className="w-80 bg-white-rounded">
                {workers.length === 0 ? (
                <p className="text-center">Nema dostupnih radnika.</p>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ime</th>
                                    <th>Opis</th>
                                    <th>Vrsta</th>
                                    <th>Pregled</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workers.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.name}</td>
                                        <td>{data.description}</td>
                                        <td>{data.type}</td>
                                        <td>
                                            <Link to={`/chosen-worker-guest/${data.id}`} className="btn btn-info m-2">Pogledaj</Link>
                                        </td>
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

export default Guest;