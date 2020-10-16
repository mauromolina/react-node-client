import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axios';
import Product from './Product';
import Spinner from '../layout/Spinner';

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const requestApi = async () => {
            const apiResponse = await axiosClient.get('/products');
            setTimeout(() => {
                setProducts(apiResponse.data);
            }, 2000);
        }
        requestApi();
    }, [products]);

    if(!products.length) return <Spinner/>

    return ( 
        <>
            <h1>Productos</h1>
            <Link to={"/products/new"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                { products.map( prod => (
                    <Product
                        key={prod._id}
                        product={prod}
                    />
                ))}
            </ul>
        </>
     );
}
 
export default Products;