import React from 'react';

const Producto = ({producto}) => {
    const { nombre, precio, id } = producto;
    return (
      <tr>
        <td>{nombre}</td>
        <td>$ {precio}</td>
        <td></td>
      </tr>
    );
}
 
export default Producto;