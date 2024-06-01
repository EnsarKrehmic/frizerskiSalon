import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginValidation from "./LoginValidation";
import axios from 'axios';
import "./Main";

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(LoginValidation(values));
        const err = LoginValidation(values);
        setErrors(err);
        if (err.email === "" && err.password === "") {
            axios.post('https://localhost:3307/login', values)
                .then(res => {
                    if (res.data === "Uspješno") {
                        navigate('/main');
                    } else {
                        alert("Unos nije snimljen");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Prijava</h2>
                <form action="" onSubmit={handleSubmit} id="loginform">
                    <div>
                        <div>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                placeholder="Unesite email"
                                onChange={handleInput} 
                                className="form-control rounded-0"
                                autoComplete="email"
                            />
                            {errors.email && <span className="text-danger"> {errors.email}</span>}
                        </div>
                        <div>
                            <label htmlFor="password"><strong>Lozinka</strong></label>
                            <input 
                                type="password" 
                                id="password"
                                name="password"
                                placeholder="Unesite lozinku"
                                onChange={handleInput} 
                                className="form-control rounded-0"
                                autoComplete="current-password"
                            />
                            {errors.password && <span className="text-danger"> {errors.password}</span>}
                            <button type="submit" className='btn btn-success bg-dark w-100 rounded-0' autoComplete="off"><strong>Prijava</strong></button>
                            <p>-</p>
                            <Link to="/register" className='btn btn-default border bg-dark w-100 rounded-0 text-decoration-none'>Napravite profil</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;