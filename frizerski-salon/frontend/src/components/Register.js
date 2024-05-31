import React, {useState} from "react";
import { useNavigate, Link  } from "react-router-dom";
import Validation from "./Validation";
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
        });

        const [errors, setErrors] = useState({});

        const navigate = useNavigate();

        const handleInput =(event) => {
            setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))

        }

        const handleSubmit =(event) => {
            event.preventDefault();
            setErrors(Validation(values));
            const err = Validation(values);
            setErrors(err);
            if(err.name === "" && err.surname === "" && err.email === "" && err.password === "") {
                axios.post('https://localhost:3307/register', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
            }
        }

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Registracija</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name"><strong>Ime</strong></label>
                        <input type="text" placeholder="Unesite ime" name="name"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.name && <span className="text-danger"> {errors.name}</span>}
                    </div>
                    <div>
                        <label htmlFor="surname"><strong>Prezime</strong></label>
                        <input type="text" placeholder="Unesite prezime" name="surname"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.surname && <span className="text-danger"> {errors.surname}</span>}
                    </div>
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
                    <button type="submit" className='btn btn-success bg-dark w-100 rounded-0'><strong>Registracija</strong></button>
                    <p>-</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-dark rounded-0 text-decoration-none'>Prijava</Link>
                </div>
                </form>
            </div>
        </div>
    )   
}

export default Register