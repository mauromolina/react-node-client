import React, {useEffect, useState} from 'react';
import axiosClient from '../../config/axios';
import Client from './Client';

const Clients = () => {

    const [clients, setClients] = useState([]);

    const requestApi = async () => {
        const apiResponse = await axiosClient.get('/clients');
        setClients(apiResponse.data.clients);
    }

    useEffect(() => {
        requestApi();
    }, []);

    return ( 
        <>
            <h1>Clientes</h1>
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