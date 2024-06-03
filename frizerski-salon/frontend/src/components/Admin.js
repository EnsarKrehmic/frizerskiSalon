import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Admin(){
    const [userInfo, setUserInfo] = useState(null);
    const [users, setUsers] = useState(null);
    const [workers, setWorkers] = useState(null);

    axios.defaults.withCredentials=true;

    useEffect(() => {
        axios.get("http://localhost:3307/api/user")
            .then(response => setUserInfo(response.data))
            .catch(error => console.error("Error fetching user information", error));
    }, []);

    useEffect(()=>{
        axios.get("http://localhost:3307/api/get-users")
        .then(response=>setUsers(response.data))
        .catch(error=>console.error("Error fetching users information", error));
    }, []);

    useEffect(()=>{
        axios.get("http://localhost:3307/api/get-workers")
        .then(response=>setWorkers(response.data))
        .catch(error=>console.error("Error fetching visits information", error));
    }, []);

    const handleStatusDeactivate=async(id)=>{
        try{
            await axios.put(`http://localhost:3307/admin/delete-user/${id}`);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    const handleStatusActivate=async(id)=>{
        try{
            await axios.put(`http://localhost:3307/admin/delete-user/${id}`);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    
    const handleDeleteWorker=async(id)=>{
        try{
            await axios.delete(`http://localhost:3307/admin/delete-worker/${id}`);
            window.location.reload();
        }catch(err){
            console.log(err);
            console.log("Brisanje radnika sa ID:", id);
        }
    }

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3307/admin/delete-user/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
            console.log("Brisanje korisnika sa ID:", id);
        }
    };    

    if (!userInfo) {
        return <div>Učitavanje...</div>;
    }

    if (!users) {
        return <div>Učitavanje...</div>;
    }

    if (!workers){
        return <div>Učitavanje...</div>;
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning">
            <div className="bg-white p-3 rounded w-100 m-5">
                <h1 className="text-center">Administratorska nadzorna ploča</h1>
                <p className="text-center">Trenutno ulogovan: {userInfo.firstName} {userInfo.lastName} ({userInfo.nickname})</p>
                <div className="d-flex justify-content-center align-items-center">
                <Link to="/main" className="btn btn-primary border w-10 text-decoration-none m-2"><LogoutButton /></Link>
                </div>
                <br />
                <div className="d-flex justify-content-center align-items-center">
                    <Link to="/add-user" className="btn btn-primary border w-10 text-decoration-none m-2">Dodajte novog admina</Link>
                    <Link to="/add-worker" className="btn btn-primary border w-10 text-decoration-none m-2">Dodajte novog radnika</Link>
                </div>
                <div className="w-80 bg-white-rounded">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nadimak</th>
                                <th>Email</th>
                                <th>Upravljaj</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((data,i)=>(
                                    <tr key={i}>
                                        <td>{data.nickname}</td>
                                        <td>{data.email}</td>
                                        <td>
                                        <Link to={`update/${data.id}`} className="btn btn-success m-2">Ažuriraj</Link>
                                        {data.status === "ACTIVE" ? (
                                            <button className="btn btn-danger m-2" onClick={() => handleStatusDeactivate(data.id)}>Deaktiviraj</button>
                                        ) : (
                                            <button className="btn btn-danger m-2" onClick={() => handleStatusActivate(data.id)}>Aktiviraj</button>
                                        )}
                                        <button className="btn btn-warning m-2" onClick={() => handleDeleteUser(data.id)}>Ukloni</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <h2 className="text-center">Svi radnici:</h2>
                <div className="w-80 bg-white-rounded">
                {workers.length === 0 ? (
                    <p className="text-center">Nijedan radnik nije kreiran.</p>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ime</th>
                                    <th>Opis</th>
                                    <th>Upravljaj</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workers.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.name}</td>
                                        <td>{data.description}</td>
                                        <td>
                                            <Link to={`chosen-worker/${data.id}`} className="btn btn-info m-2">Pogledaj</Link>
                                            <Link to={`update-worker/${data.id}`} className="btn btn-success m-2">Ažuriraj</Link>
                                            <button className="btn btn-warning m-2" onClick={e => handleDeleteWorker(data.id)}>Ukloni</button>
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

export default Admin;