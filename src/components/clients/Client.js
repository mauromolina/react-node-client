import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';

const Client = ({ client }) => {

    const { _id, name, surname, email, phone, company} = client;

    const deleteClient = id => {
        Swal.fire({
            title: `Eliminar a ${name} ${surname}?`,
            text: "Un usuario eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/clients/${id}`)
                .then( res => {
                    Swal.fire(
                        'Perfecto!',
                        res.data.msg,
                        'success'
                    )
                })
            }
          })
    }

    return ( 
        <>
            <li className="cliente">
                <div className="info-cliente">
                    <p className="nombre">{name + ' ' + surname}</p>
                    <p className="empresa">{company}</p>
                    <p>{email}</p>
                    <p>{phone}</p>
                </div>
                <div className="acciones">
                    <Link to={`/clients/edit/${client._id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Cliente
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => deleteClient(client._id)}
                        >
                        <i className="fas fa-times"></i>
                        Eliminar Cliente
                    </button>
                </div>
            </li>
        </>
     );
}
 
export default Client;