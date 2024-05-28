import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';

const DataList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData()
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div>
            <h1>Data from MySQL Database</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DataList;
