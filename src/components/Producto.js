import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction } from '../actions/productionActions';

const Producto = ({producto}) => {
    const { nombre, precio, id } = producto;
    const dispatch = useDispatch();
    const history = useHistory(); // habilitar history para redireccion

    //confirmar si desea eliminar
    const confirmarEliminarProducto = id => {

      //pregunar al usuario si desea o no borrar un producto
      Swal.fire({
        title: '¿Realmente deseas borrar este producto?',
        text: "Tu estas a tiempo de cambiar de opinion.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, borrar esto!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          //pasarlo al action
          dispatch( borrarProductoAction(id) );
        }
      });
    }

    // funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
      history.push(`/productos/editar/${producto.id}`)
    }

    return (
      <tr>
        <td>{nombre}</td>
        <td> <span className="font-weight-bold">$ {precio}</span></td>
        <td className="acciones">
          <button
            type="button"
            onClick={() => redireccionarEdicion(producto)}
            className="btn btn-primary mr-2"
          >
            Editar
          </button>
          
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => confirmarEliminarProducto(id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
}
 
export default Producto;