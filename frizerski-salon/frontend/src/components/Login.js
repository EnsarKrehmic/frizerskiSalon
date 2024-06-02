import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Validation from "./LoginValidation";
import axios from 'axios';

function Login(){
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    axios.defaults.withCredentials=true;
    const navigate=useNavigate();

    const [errors, setErrors] = useState({})

    const handleInput=(event)=>{
        setValues(prev => ({...prev, [event.target.name]: event.target.value }))
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(Validation(values));
        const err = Validation(values);
        setErrors(err);
        if (err.email ==="" && err.password ===""){
            axios.post('https://localhost:3307/login', values)
            .then(res=>{
                if(res.data === "DEACTIVATED") {
                    alert("Vaš profil je deaktiviran te se ne možete prijaviti.");
                    navigate("/");
                }
                else if(res.data==="USER"){
                    navigate("/main")
                }
                else if(res.data==="ADMIN"){
                    navigate("/admin")
                }
                else{
                    alert("Unos nije primljen.");
                }
            })
            .catch(err=>console.log(err));
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>PRIJAVA</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" name="email"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Lozinka</label>
                        <input type="password" placeholder="Enter Password" name="password"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 mb-2">Prijava</button>
                    <Link to="/register" className="btn btn-success w-100 mb-2 bg-dark">Nemate profil? Registrirajte se!</Link>
                    <Link to="/guest" className="btn btn-success w-100 mb-2 bg-dark">Pristupite stranici kao Gost</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;