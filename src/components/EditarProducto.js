import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
//useDispatch para ejecutar las acciones y useSelector para acceder al state

import {editarProductoAction} from '../actions/productoActions'; 
import { useHistory } from 'react-router-dom';


const EditarProducto = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    // nuevo state de producto
    const [ producto, guardarProducto] = useState({
        nombre:'',
        precio:''
    })

    // producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);

    // llenar el state automaticamente
    useEffect(() => {
        guardarProducto(productoeditar);
    }, [productoeditar]);

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const {nombre, precio } = producto;
    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch(editarProductoAction(producto) ); 
        
        // redirigir al inicio
        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio del producto"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Guardar cambios
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarProducto;