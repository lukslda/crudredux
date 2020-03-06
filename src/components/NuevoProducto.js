import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// useDispatch nos sirve para mandar a ejecutar las actiones que tengamos
// useSelector es una forma para acceder al state dentro del componente

// actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import {mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';


const NuevoProducto = ({history}) => {

    //state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    // acceder al state del store
    const error = useSelector( state => state.productos.error);
    const alerta = useSelector( state => state.alerta.alerta);

    // mandar llamar el action de productoAction
    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) );

    // cuando el usuario envie el formulario
    const submitNuevoProducto = e => {
        e.preventDefault();

        //validar el formulario
        if(nombre.trim() === '' || precio === 0 ) {
            
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            
            dispatch (mostrarAlerta(alerta));
            
            return;
        }

        // si no se encuentran errores...
        dispatch( ocultarAlertaAction() );

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // redireccionar a la raiz luego de añadir un producto
        history.push('/');
    }


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card mt-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>

                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del producto"
                                    name={nombre}
                                    onChange = {e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio del producto"
                                    name={precio}
                                    onChange = {e => guardarPrecio( Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                        </form>
                        {/* { cargando ? <p>Cargando...</p> : null } */}
                        { error ? <p className= "alert alert-danger p2 mt-3 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;