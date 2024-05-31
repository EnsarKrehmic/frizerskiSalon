import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from 'axios';
import "./Main";

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
        })

        const navigate = useNavigate();

        const [errors, setErrors] = useState({})

        const handleInput =(event) => {
            setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))

        }

        const handleSubmit =(event) => {
            event.preventDefault();
            setErrors(Validation(values));
            const err = Validation(values);
            setErrors(err);
            if(err.email === "" && err.password === "") {
                axios.post('https://localhost:3307/login', values)
                .then(res => {
                    if(res.data === "Uspješno") {
                        navigate('/main');
                    } else {
                        alert("Unos nije snimljen")
                    }
                })
                .catch(err => console.log(err));
            }
        }

        return (
            <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Prijava</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" placeholder="Unesite email" name="email"
                            onChange={handleInput} className="form-control rounded-0"/>
                            {errors.email && <span className="text-danger"> {errors.email}</span>}
                        </div>
                        <div>
                        <label htmlFor="password"><strong>Lozinka</strong></label>
                        <input type="password" placeholder="Unesite lozinku" name="password"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.password && <span className="text-danger"> {errors.password}</span>}
                        <button type="submit" className='btn btn-success bg-dark w-100 rounded-0'><strong>Prijava</strong></button>
                        <p>-</p>
                        <Link to="/register" className='btn btn-default border bg-dark w-100 rounded-0 text-decoration-none'>Napravite profil</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login