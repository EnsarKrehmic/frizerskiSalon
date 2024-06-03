import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Validation from "./WorkerValidation";

function UpdateWorker(){
    const {id}=useParams();
    const [values, setValues]=useState({
        title:'',
        description:'',
        type:'Frizer'
    })

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    };

    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.title==="" && errors.description===""){
            axios.put("http://localhost:3307/admin/update-worker/"+id, values)
            .then(res=>{
                console.log("Server response:", res.data);
                alert("Radnik je uspješno ažuriran.");
                navigate("/admin");
            })
            .catch(err=>console.log(err));
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Ažuriranje radnika</h2>
                <Link to="/admin" className="btn btn-success border w-100 bg-dark text-decoration-none">Nazad</Link>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title">Ime</label>
                        <input type="text" placeholder="Enter Title" name="title"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.title && <span className="text-danger">{errors.title}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description">Opis</label>
                        <input type="text" placeholder="Enter Description" name="description"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.description && <span className="text-danger">{errors.description}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type">Izaberite vrstu radnika:</label>
                        <select name="type" onChange={handleInput} className="form-control rounded-0">
                            <option value="Hairdresser">Frizer</option>
                            <option value="Stylist">Stilista</option>
                            <option value="Auxiliary worker">Pomoćni radnik</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Ažuriraj radnika</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateWorker;