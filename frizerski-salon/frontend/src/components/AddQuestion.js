import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function AddQuestion(){
    const {id}=useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [values, setValues]=useState({
        content:'',
        user_id:''
    })

    axios.defaults.withCredentials=true;
    const navigate=useNavigate();

    const handleInput=(event)=>{
        setValues(prev =>({...prev, [event.target.name]:[event.target.value]}))
    }

    const handleSubmit=(event)=>{
        values.user_id=userInfo.id;
        event.preventDefault();
        axios.post("http://localhost:3307/add-question/"+id, values)
        .then(res=>{
            if (res.data==="OK"){
                alert("Pitanje uspješno postavljeno.");
                navigate(`/chosen-travel/${id}`);
            }
            else{
                alert("Pitanje nije postavljeno.");
            }
        })
        .catch(err=>console.log(err));
    }

    useEffect(() => {
        axios.get("http://localhost:3307/api/user")
            .then(response => setUserInfo(response.data))
            .catch(error => console.error("Error fetching user information", error));
    }, []);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Postavite pitanje</h2>
                <Link to={`/chosen-worker/${id}`} className="btn btn-default border w-100 bg-light text-decoration-none">Nazad</Link>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="content">Sadržaj</label>
                        <input type="text" placeholder="Unesite sadržaj" name="content"
                        onChange={handleInput} className="form-control rounded-0"/>
                    </div>
                    <button type="submit" className="btn btn-success w-100 mb-2">Postavite pitanje</button>
                </form>
            </div>
        </div>
    )
}

export default AddQuestion;