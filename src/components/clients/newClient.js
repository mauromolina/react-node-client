import React, {useState} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
import axiosClient from '../../config/axios';


const NewClient = ({history}) => {

    const [client, setClient] = useState({
        name: '',
        surname: '',
        company: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    const validateClient = () => {
        const { name, surname, company, email , phone} = client;
        let valid = !name.length || !surname.length || !email.length || !company.length || !phone.length;
        return valid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosClient.post('/clients', client)
        .then( response => {
            if(response.data.code === 11000){
                Swal.fire(
                    'Error',
                    'El correo ya está en uso',
                    'error'
                )
                history.push('/clients/new');
            }else {
                console.log(response.data);
                Swal.fire(
                    'Perfecto!',
                    response.data.msg,
                    'success'
                )
                history.push('/');
            }
        });
    }

    return ( 
        <>
        <h2>Nuevo Cliente</h2>
        <form
            onSubmit={handleSubmit}>
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input 
                    type="text" 
                    placeholder="Nombre Cliente" 
                    name="name"
                    onChange={handleChange}/>
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input 
                    type="text" 
                    placeholder="Apellido Cliente" 
                    name="surname"
                    onChange={handleChange}/>
            </div>
        
            <div className="campo">
                <label>Empresa:</label>
                <input 
                    type="text" 
                    placeholder="Empresa Cliente" 
                    name="company"
                    onChange={handleChange}/>
            </div>

            <div className="campo">
                <label>Email:</label>
                <input 
                    type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={handleChange}/>
            </div>

            <div className="campo">
                <label>Teléfono:</label>
                <input 
                    type="text" 
                    placeholder="Teléfono Cliente" 
                    name="phone"
                    onChange={handleChange}/>
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
 
export default withRouter(NewClient);