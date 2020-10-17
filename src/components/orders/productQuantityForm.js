import React from 'react';

const ProductQuantityForm = (props) => {

    const { product, index, handleChange, deleteProduct } = props;

    return ( 
        <li>
            <div className="texto-producto">
                <p className="nombre">{product.name}</p>
                <p className="precio">${product.price}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <input
                        type="number"
                        defaultValue="1"
                        min="1" step="1"
                        name="quantity"
                        onChange={(e) => handleChange(e, index)}  
                    />
                </div>
                <button 
                    type="button" 
                    className="btn btn-rojo"
                    onClick={() => deleteProduct(product._id)}>
                    <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
            </div>
        </li>
     );
}
 
export default ProductQuantityForm;