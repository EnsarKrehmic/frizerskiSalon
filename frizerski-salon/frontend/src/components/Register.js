import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./RegisterValidation";
import axios from 'axios';

function Register(){
    const [values, setValues]=useState({
        firstName:'',
        lastName:'',
        nickname:'',
        email:'',
        password: ''
    });

    const navigate=useNavigate();

    const [errors, setErrors] = useState({})

    const handleInput=(event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        const err = Validation(values);
        setErrors(err);
        if (err.firstName === "" && err.lastName === "" && err.nickname === "" && err.email === "" && err.password === "") {
            axios.post('http://localhost:3307/register', values)
            .then(res => {
                // Poruka o uspješnoj registraciji
                alert("Uspješno ste se registrovali! Molimo prijavite se.");

                // Preusmjeravanje korisnika na stranicu za prijavu
                navigate('/login');
            })
            .catch(err => console.log(err));
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>REGISTRACIJA</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName">Ime</label>
                        <input type="text" placeholder="Unesite ime" name="firstName"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName">Prezime</label>
                        <input type="text" placeholder="Unesite prezime" name="lastName"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nickname">Nadimak</label>
                        <input type="text" placeholder="Unesite nadimak" name="nickname"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.nickname && <span className="text-danger">{errors.nickname}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Unesite email" name="email"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Lozinka</label>
                        <input type="password" placeholder="Unesite lozinku" name="password"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-success w-100">Registracija</button>
                    <Link to="/login" className="btn btn-success w-100 mb-2 bg-dark">Već imate profil? Prijavite se!</Link>
                </form>
            </div>
        </div>
    )
}

export default Register;