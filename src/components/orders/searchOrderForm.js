import React from 'react';

const SearchOrderForm = (props) => {
    return ( 
        <form
            onSubmit={props.searchProduct}>
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div className="campo">
                    <label>Productos:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Productos" 
                        name="products"
                        onChange={props.handleSearch}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-azul btn-block"
                    value="Buscar"
                />
        </form>
     );
}
 
export default SearchOrderForm;