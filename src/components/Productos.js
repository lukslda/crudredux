import React, {Fragment, useEffect} from 'react';
import Producto from './Producto';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductosAction } from '../actions/productionActions';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        
        // consultar la api
        const cargarProductos = () => dispatch( obtenerProductosAction() );
        cargarProductos();

    }, [])

    // obtener el state
    const productos = useSelector( state => state.productos.productos );


    return ( 
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            
            <table className="table table-striped">
                <thead className="bg-primary table-dark"> 
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                
                <tbody>
                    { productos.length === 0 ? 'No hay productos' :
                        productos.map(productos => (
                            <Producto 
                                key={productos.id}
                                producto={producto}
                            />
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Productos;