import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';

const Product = ({product}) => {

    const { _id, name, price, image } = product;

    const deleteProduct = id => {
        Swal.fire({
            title: `Eliminar ${name}?`,
            text: "Un producto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/products/${id}`)
                .then( res => {
                    if(res.status === 200) {
                        Swal.fire(
                            'Perfecto!',
                            res.data.msg,
                            'success'
                        )
                    }
                })
            }
          })
    }

    return ( 
        <>
            <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{name}</p>
                        <p className="precio">${price} </p>
                        { image ? (
                            <img src={`http://localhost:5000/${image}`} alt="imagen"/>
                        ): null}
                    </div>
                    <div className="acciones">
                        <Link to={`/products/edit/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button 
                            type="button" 
                            className="btn btn-rojo btn-eliminar"
                            onClick={() => deleteProduct(_id)}>
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
        </>
     );
}
 
export default Product;