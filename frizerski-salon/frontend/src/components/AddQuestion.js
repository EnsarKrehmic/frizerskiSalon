import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

/**
 * AddQuestion component is responsible for allowing users to post questions for a chosen worker.
 * It fetches user information and posts the question to the server.
 * It renders a form for the user to enter the question content.
 */
function AddQuestion() {
    // Get the id parameter from the URL
    const { id } = useParams();
    // State for user information
    const [userInfo, setUserInfo] = useState(null);
    // State for form values
    const [values, setValues] = useState({
        content: '',
        user_id: ''
    });

    // Set default credentials for axios requests
    axios.defaults.withCredentials = true;
    // Navigate function for redirecting to other pages
    const navigate = useNavigate();

    /**
     * Handles input changes for the form fields.
     * @param {Object} event - The event object.
     */
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    /**
     * Handles form submission.
     * @param {Object} event - The event object.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        // Set the user_id field with the user's id
        values.user_id = userInfo.id;
        // Post the question to the server
        axios.post(`http://localhost:3307/add-question/${id}`, values)
            .then(res => {
                // If the response is "OK", show a success message and redirect to the chosen worker page
                if (res.data === "OK") {
                    alert("Pitanje uspješno postavljeno.");
                    navigate(`/chosen-worker/${id}`);
                } else {
                    // If the response is not "OK", show an error message
                    alert("Pitanje nije postavljeno.");
                }
            })
            .catch(err => console.log(err));
    };

    // Fetch user information when the component mounts
    useEffect(() => {
        axios.get("http://localhost:3307/api/user")
            .then(response => setUserInfo(response.data))
            .catch(error => console.error("Error fetching user information", error));
    }, []);

    // If user information is not yet fetched, show a loading message
    if (!userInfo) {
        return <div>Učitavanje...</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Postavite pitanje</h2>
                <Link to={`/chosen-worker/${id}`} className="btn btn-success border w-100 bg-dark text-decoration-none">Nazad</Link>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="content">Sadržaj</label>
                        <input type="text" placeholder="Unesite sadržaj" name="content"
                            onChange={handleInput} className="form-control rounded-0" />
                    </div>
                    <button type="submit" className="btn btn-success w-100 mb-2">Postavite pitanje</button>
                </form>
            </div>
        </div>
    );
}

export default AddQuestion;