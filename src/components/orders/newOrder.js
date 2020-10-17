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
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getClient = async () => {
            const result = await axiosClient.get(`/clients/${id}`);
            setClient(result.data);
        }
        getClient();
        updateTotal();
    }, [products]);

    const searchProduct = async e => {
        e.preventDefault();
        const result = await axiosClient.post(`/products/search/${search}`);
        if(result.data[0]){
            let resultProduct = result.data[0];
            resultProduct.product = result.data[0]._id;
            resultProduct.quantity = 1;
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

    const handleChange = (e, i) => {
        const allProducts = [...products];
        allProducts[i].quantity = e.target.value;
        setProducts(allProducts);
    }

    const updateTotal = () => {
        if(products.length === 0){
            setTotal(0);
            return;
        }
        let newTotal = 0;
        products.map( product => newTotal += (product.quantity * product.price));
        setTotal(newTotal);

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
                            handleChange={handleChange}
                            index={index}
                        />
                    ) )}
                </ul>
                <p className="total">
                    Total a pagar : <span>${total}</span>
                </p>
                { total > 0 ? (
                    <form>
                        <input 
                            type="submit"
                            className="btn btn-verde btn-block"
                            value="Realizar pedido"
                        />
                    </form>
                ) : null}
            </div>
        </>
     );
}
 
export default NewOrder;