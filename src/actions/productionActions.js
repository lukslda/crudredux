import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO
 } from '../types';

 // en los Actions, son los encargados de insertar en la base de dato o mandar a ejecutar el reducer para modificar el state

 // crear nuevos productos
 export function crearNuevoProductoAction(producto) {
     return (dispatch) => {
         dispatch( agregarProducto() );

         try {
             dispatch( agregarProductoExito(producto) );
         } catch (error) {
             dispatch( agregarProductoError(true) );
         }
     }
 }

 const agregarProducto = () => ({
     type: AGREGAR_PRODUCTO,
     payload: true
 })

 // si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

 // si hubo un error al interntar guardar el producto
 const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})