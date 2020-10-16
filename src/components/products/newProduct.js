import React, {useState} from 'react'
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';
import { withRouter } from 'react-router-dom'

const NewProduct = (props) => {

    const [product, setProduct] = useState({
        name: '',
        price: ''
    });

    const [file, setFile] = useState('');

    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const validateProduct = () => {
        const { name, price} = product;
        let valid = !name.length || !price.length;
        return valid;
    }

    const uploadFile = e => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file);
        try {
            const res = await axiosClient.post('/products', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log(res);
            if(res.status === 200){
                Swal.fire(
                    'Perfecto!',
                    'Se agregó correctamente el producto',
                    'success'
                )
            }
            props.history.push('/products')
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Intente agregar el producto nuevamente'
            })
        }
    }

    return ( 
        <>
            <h2>Nuevo Producto</h2>
            <form
                onSubmit={handleSubmit}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="name"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="price" min="0.00" step="0.01" 
                        placeholder="Precio" 
                        onChange={handleChange}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file"  
                        name="image"
                        onChange={uploadFile}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Producto"
                            disabled={validateProduct()}
                        />
                </div>
            </form>
        </>
     );
}
 
export default withRouter(NewProduct);