import React from 'react';

const Order = ({order}) => {
    return ( 
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {order._id}</p>
                <p className="nombre">Cliente: {order.client.name} {order.client.surname}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {order.products.map( prod => (
                            <li key={order._id+prod.product._id}>
                                <p>{prod.product.name}</p>
                                <p>Precio: $ {prod.product.price}</p>
                                <p>Cantidad: {prod.quantity}</p>
                            </li>

                        ))}
                    </ul>
                </div>
                <p className="total">Total: ${order.total} </p>
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
     );
}
 
export default Order;