import React, {useState, useEffect} from 'react';
import axiosClient from '../../config/axios';
import Order from './Order';

const Orders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const requestApi = async () => {
            const apiResponse = await axiosClient.get('/orders');
            console.log(apiResponse.data);
            setOrders(apiResponse.data);
        }
        requestApi();
    }, []);

    return ( 
        <>
        <h2>Pedidos</h2>
        <ul className="listado-pedidos">
        { orders.map( order => (
                <Order
                    key={order._id}
                    order={order}
                />
            ))}
        </ul>
        </>
     );
}
 
export default Orders;