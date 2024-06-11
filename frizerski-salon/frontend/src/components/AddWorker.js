import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./WorkerValidation";

/**
 * Component for adding a new worker.
 */
function AddWorker() {
    // State for form values and errors
    const [values, setValues] = useState({
        title: '',
        description: '',
        type: ''
    });

    // Set axios default credentials to true
    axios.defaults.withCredentials = true;
    // Get the navigate function from react-router-dom
    const navigate = useNavigate();

    // State for form errors
    const [errors, setErrors] = useState({});

    /**
     * Handle input change event.
     * @param {Object} event - The input change event.
     */
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    /**
     * Handle form submission event.
     * @param {Object} event - The form submission event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if (values.title !== "" && values.description !== "") {
            // Send a POST request to add the worker
            axios.post("http://localhost:3307/admin/add-worker", values)
                .then(res => {
                    console.log("Server response:", res.data);
                    alert("Radnik uspješno kreiran.");
                    navigate("/admin");
                })
                .catch(err => console.log(err));
        }
    }
    

    return (
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-35">
                {/* Form title */}
                <h2>Dodavanje novog radnika</h2>
                {/* Button to navigate back */}
                <Link to="/admin" className="btn btn-success border w-100 bg-dark text-decoration-none center">Nazad</Link>
                {/* Form to add a new worker */}
                <form action="" onSubmit={handleSubmit}>
                    {/* Input for worker title */}
                    <div className="mb-3">
                        <label htmlFor="name">Ime</label>
                        <input type="text" placeholder="Unesite ime" name="title"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.title && <span className="text-danger">{errors.title}</span>}
                    </div>
                    {/* Input for worker description */}
                    <div className="mb-3">
                        <label htmlFor="description">Opis</label>
                        <input type="text" placeholder="Unesite opis" name="description"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.description && <span className="text-danger">{errors.description}</span>}
                    </div>
                    {/* Select dropdown for worker type */}
                    <div className="mb-3">
                        <label htmlFor="type">Izaberite vrstu radnika:</label>
                        <select name="type" onChange={handleInput} className="form-control rounded-0">
                            <option value="Hairdresser">Frizer</option>
                            <option value="Stylist">Stilista</option>
                            <option value="Auxiliary worker">Pomoćni radnik</option>
                        </select>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-success w-100">Dodaj radnika</button>
                </form>
            </div>
        </div>
    );
}

export default AddWorker;