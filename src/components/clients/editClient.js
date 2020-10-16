import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
import axiosClient from '../../config/axios';

const EditClient = (props) => {

    const { id } = props.match.params;

    const [client, setClient] = useState({
        name: '',
        surname: '',
        company: '',
        email: '',
        phone: ''
    });

    const requestApi = async () => {
        const apiResponse = await axiosClient.get(`/clients/${id}`);
        setClient(apiResponse.data);
    }

    useEffect(() => {
        requestApi();
    }, []);

    const handleChange = (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosClient.put(`clients/${client._id}`, client)
        .then( response => {
            if(response.data.code === 11000){
                Swal.fire(
                    'Error',
                    'El correo ya está en uso',
                    'error'
                )
                props.history.push('/clients/new');
            }else {
                console.log(response.data);
                Swal.fire(
                    'Perfecto!',
                    'Se actualizó correctamente el cliente',
                    'success'
                )
                props.history.push('/');
            }
        })
    }

    const validateClient = () => {
        const { name, surname, company, email , phone} = client;
        let valid = !name.length || !surname.length || !email.length || !company.length || !phone.length;
        return valid;
    }

    return ( 
        <>
            <h2>Editar Cliente: {client.name + ' ' + client.surname}</h2>
            <form
                onSubmit={handleSubmit}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="name"
                        onChange={handleChange}
                        value={client.name}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="surname"
                        onChange={handleChange}
                        value={client.surname}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text" 
                        placeholder="Empresa Cliente" 
                        name="company"
                        onChange={handleChange}
                        value={client.company}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={handleChange}
                        value={client.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="text" 
                        placeholder="Teléfono Cliente" 
                        name="phone"
                        onChange={handleChange}
                        value={client.phone}/>
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar"
                            disabled={validateClient()}/>
                </div>

            </form>
        </>
     );
}
 
export default withRouter(EditClient);