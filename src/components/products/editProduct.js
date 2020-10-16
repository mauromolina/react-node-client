import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'
import axiosClient from '../../config/axios';
import Spinner from '../layout/Spinner';

const EditProduct = (props) => {

    const { id } = props.match.params;

    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    const [file, setFile] = useState('');

    
    useEffect(() => {
        const requestApi = async () => {
            const apiResponse = await axiosClient.get(`/products/${id}`);
            setTimeout(() => {
                setProduct(apiResponse.data);
            }, 1000);
        }
        requestApi();
    }, []);

    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const uploadFile = e => {
        setFile(e.target.files[0]);
    }

    const validateProduct = () => {
        const { name, price} = product;
        let valid = !name.length;
        return valid;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file);
        try {
            const res = await axiosClient.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if(res.status === 200){
                Swal.fire(
                    'Perfecto!',
                    'Se editó correctamente el producto',
                    'success'
                )
            }
            props.history.push('/products')
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Intente editar el producto nuevamente'
            })
        }
    }

    const { name, price, image } = product

    if(!name) return <Spinner/>

    return ( 
        <>
            <h2>Editar Producto</h2>
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
                        defaultValue={name}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="price" min="0.00" step="0.01" 
                        placeholder="Precio" 
                        onChange={handleChange}
                        defaultValue={price}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    { image ? (
                        <img src={`http://localhost:5000/${image}`} alt="imagen" width="300"/>
                    ) : null}
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
                            value="Editar Producto"
                            disabled={validateProduct()}
                        />
                </div>
            </form>
        </>
     );
}
 
export default EditProduct;