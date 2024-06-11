import axios from "axios"; // axios library for making HTTP requests
import React, { useEffect, useState } from "react"; // React library for building user interfaces
import { Link } from "react-router-dom"; // React Router library for handling routing
import LogoutButton from "./LogoutButton";

/**
 * Admin component for the admin panel.
 * Retrieves user information, list of users, and list of workers from the server.
 * Provides functionality to deactivate/activate users, delete workers, and delete users.
 */
function Admin() {
    // State variables to store user information, list of users, and list of workers
    const [userInfo, setUserInfo] = useState(null); // User information
    const [users, setUsers] = useState(null); // List of users
    const [workers, setWorkers] = useState(null); // List of workers

    // Set default credentials for axios requests to include credentials
    axios.defaults.withCredentials = true;

    // Fetch user information from the server
    useEffect(() => {
        axios.get("http://localhost:3307/api/user")
            .then(response => setUserInfo(response.data)) // Set user information
            .catch(error => console.error("Error fetching user information", error)); // Log error if fetching fails
    }, []);

    // Fetch list of users from the server
    useEffect(() => {
        axios.get("http://localhost:3307/api/get-users")
            .then(response => setUsers(response.data)) // Set list of users
            .catch(error => console.error("Error fetching users information", error)); // Log error if fetching fails
    }, []);

    // Fetch list of workers from the server
    useEffect(() => {
        axios.get("http://localhost:3307/api/get-workers")
            .then(response => setWorkers(response.data)) // Set list of workers
            .catch(error => console.error("Error fetching visits information", error)); // Log error if fetching fails
    }, []);

    /**
     * Function to deactivate a user.
     * @param {string} userId - The ID of the user to deactivate.
     */
    const deactivateUser = async (userId) => {
        try {
            await axios.put(`http://localhost:3307/admin/deactivate/${userId}`); // Send PUT request to deactivate user
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error("Failed to deactivate user", error); // Log error if deactivation fails
        }
    }

    /**
     * Function to activate a user.
     * @param {string} userId - The ID of the user to activate.
     */
    const activateUser = async (userId) => {
        try {
            await axios.put(`http://localhost:3307/admin/activate/${userId}`); // Send PUT request to activate user
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error("Failed to activate user", error); // Log error if activation fails
        }
    }

    /**
     * Function to delete a worker.
     * @param {string} userId - The ID of the worker to delete.
     */
    const handleDeleteWorker = async (userId) => {
        try {
            await axios.delete(`http://localhost:3307/admin/delete-worker/${userId}`); // Send DELETE request to delete worker
            window.location.reload(); // Reload the page
        } catch (err) {
            console.log(err); // Log error if deletion fails
            console.log("Brisanje radnika sa ID:", userId); // Log the ID of the deleted worker
        }
    }

    /**
     * Function to delete a user.
     * @param {string} userId - The ID of the user to delete.
     */
    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3307/admin/delete-user/${userId}`); // Send DELETE request to delete user
            window.location.reload(); // Reload the page
        } catch (err) {
            console.log(err); // Log error if deletion fails
            console.log("Brisanje korisnika sa ID:", userId); // Log the ID of the deleted user
        }
    };

    // If user information is not yet loaded, display loading message
    if (!userInfo) {
        return <div>Učitavanje...</div>;
    }

    // If list of users is not yet loaded, display loading message
    if (!users) {
        return <div>Učitavanje...</div>;
    }

    // If list of workers is not yet loaded, display loading message
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
                                            <button className="btn btn-danger m-2" onClick={() => deactivateUser(data.id)}>Deaktiviraj</button>
                                        ) : (
                                            <button className="btn btn-danger m-2" onClick={() => activateUser(data.id)}>Aktiviraj</button>
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