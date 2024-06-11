import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./RegisterValidation";
import axios from "axios";

/**
 * Component for adding a new user.
 */
function AddUser() {
    // State for form values and errors
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        password: ''
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
        if (errors.firstName === "" && errors.lastName === "" && errors.nickname === "" && errors.email === "" && errors.password === "") {
            axios.post("http://localhost:3307/register", values)
                .then(res => {
                    console.log("Server response:", res.data);
                    alert("Korisnik uspješno kreiran.");
                    navigate("/admin");
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Dodajte novog korisnika</h2>
                <Link to="/admin" className="btn btn-success border w-100 bg-dark text-decoration-none center">Nazad</Link>
                <form action="" onSubmit={handleSubmit}>
                    {/* First name input */}
                    <div className="mb-3">
                        <label htmlFor="firstName">Ime</label>
                        <input type="text" placeholder="Unesite ime" name="firstName"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
                    </div>
                    {/* Last name input */}
                    <div className="mb-3">
                        <label htmlFor="lastName">Prezime</label>
                        <input type="text" placeholder="Unesite prezime" name="lastName"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
                    </div>
                    {/* Nickname input */}
                    <div className="mb-3">
                        <label htmlFor="nickname">Nadimak</label>
                        <input type="text" placeholder="Unesite nadimak" name="nickname"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.nickname && <span className="text-danger">{errors.nickname}</span>}
                    </div>
                    {/* Email input */}
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Unesite email" name="email"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    {/* Password input */}
                    <div className="mb-3">
                        <label htmlFor="password">Lozinka</label>
                        <input type="password" placeholder="Unesite lozinku" name="password"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-success w-100">Dodaj korisnika</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser;