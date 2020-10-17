import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';
import SearchOrderForm from './searchOrderForm';
import ProductQuantityForm from './productQuantityForm';

const NewOrder = (props) => {

    const { id } = props.match.params;

    const [client, setClient] = useState({});
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getClient = async () => {
            const result = await axiosClient.get(`/clients/${id}`);
            setClient(result.data);
        }
        getClient();
    }, []);

    const searchProduct = async e => {
        e.preventDefault();
        const result = await axiosClient.post(`/products/search/${search}`);
        if(result.data[0]){
            let resultProduct = result.data[0];
            resultProduct.product = result.data[0]._id;
            resultProduct.quantity = 0;
            setProducts([...products, resultProduct]);
        } else {
            Swal.fire(
                'Sin resultados',
                'No se encontraron productos',
                'error'
            )
        }
    }

    const handleSearch = e => {
        setSearch(e.target.value);
    }

    const { name, surname, email, phone, company } = client;

    return ( 
        <>
            <h2>Nuevo pedido</h2>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <hr></hr>
                <p>{name} {surname}</p>
                <p>Empresa: {company}</p>
                <p>Tel: {phone}</p>
                <p>Correo: {email}</p>
            </div>
            <div className="search-form">
                <SearchOrderForm
                    searchProduct={searchProduct}
                    handleSearch={handleSearch}
                />
                <ul className="resumen">
                    { products.map( (product, index) => (
                        <ProductQuantityForm
                            key={product.product}
                            product={product}
                        />
                    ) )}
                </ul>
                <div className="campo">
                    <label>Total:</label>
                    <input type="number" name="price" placeholder="Precio" readOnly="readonly" />
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
                </div>
            </div>
        </>
     );
}
 
export default NewOrder;