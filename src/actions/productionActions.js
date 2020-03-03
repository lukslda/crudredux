import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_ELIMINAR
 } from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

 // en los Actions, son los encargados de insertar en la base de dato o mandar a ejecutar el reducer para modificar el state

 // crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try {
             // insertar en la API
             await clienteAxios.post('/productosx', producto);

             // si todo sale bien, actualizar el state
             dispatch( agregarProductoExito(producto) );

             Swal.fire(
                 'Correcto',
                 'El producto se agregó correctamente',
                 'success'
             )

        } catch (error) {
            // console.log(error);

            // si hay un error cambiar el state
            dispatch( agregarProductoError(true) );

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intentar de nuevo'
            })
        }
     }
 }

 const agregarProducto = () => ({
     type: AGREGAR_PRODUCTO,
     payload: true
 });

 // si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

 // si hubo un error al interntar guardar el producto
 const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch ( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            dispatch ( descargaProductosError() ) 
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

// Selecciona y elimina un producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id) );

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch (eliminarProductoExito() );

            // Si se elimina, mostrar alerta
            Swal.fire(
                '¡Borrado!',
                'Producto borrado exitosamente.',
                'success'
            )
        } catch (error) {
            dispatch( eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});