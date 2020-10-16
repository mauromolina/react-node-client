import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosClient from '../../config/axios';
import Client from './Client';
import Spinner from '../layout/Spinner';

const Clients = () => {

    const [clients, setClients] = useState([]);

    const requestApi = async () => {
        const apiResponse = await axiosClient.get('/clients');
        setTimeout(() => {
            setClients(apiResponse.data.clients);
        }, 2000);
    }

    useEffect(() => {
        requestApi();
    }, [clients]);

    if(!clients.length) return <Spinner/>

    return ( 
        <>
            <h1>Clientes</h1>
            <Link to={"/clients/new"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
            {clients.map( client => (
                        <Client
                            key={client._id}
                            client={client}
                        />
                    )
                )}
            </ul>
        </>
     );
}
 
export default Clients;