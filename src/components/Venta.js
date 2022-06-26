import { useEffect, useState } from "react";

export const Venta = () => {
    const [productos, setProductos] = useState([])
    const [productosEnVenta, setProductosEnVenta] = useState([])
    const [clientes, setClientes] = useState([])
    const [clienteSeleccionado, setClienteSeleccionado] = useState("")

    useEffect(() => {
        fetch('http://localhost:3001/clientes')
        .then(res => res.json())
        .then(res => setClientes(res))

        fetch("http://localhost:3001/productos")
            .then(res => res.json())
            .then(res => setProductos(res))
    },[])

    const addProductoAVenta = producto => {
        console.log(`id ${producto.id_producto}`)
        producto['cantidad'] = 0
        
        console.log(productosEnVenta.includes(producto.id_producto))
        const ids = productosEnVenta.map(prod => prod.id_producto)
        if(!ids.includes(producto.id_producto)){
            setProductosEnVenta(prevProductos => prevProductos.concat(producto))
        }
    }

    const removeProductoDeVenta = index => {
        const array1 = productosEnVenta.slice(0, index)
        const array2 = productosEnVenta.slice(index + 1)
        setProductosEnVenta(array1.concat(array2))
    }

    const terminarVenta = () => {
        if(clienteSeleccionado === ''){
            alert('No ha seleccionado un cliente aun')
        }
        else{
            console.log('fetching')
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                productos : productosEnVenta,
                cliente : clienteSeleccionado
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            console.log(clienteSeleccionado, productosEnVenta)

            fetch("http://localhost:3001/venta", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error_', error));

        }
    }

    const comprobarCantidades = (producto, e, index) => {
        if(producto.existencia < e.target.value || e.target.value < 0)
        {
            alert('Cantidad incorrecta')
            e.target.value = 0
        } else {
            productosEnVenta[index]['cantidad'] = parseInt(e.target.value)
            console.log(producto,e.target.value,index)
        }
        if(e.target.value === '') productosEnVenta[index].cantidad = 0
    }

    const headerAdd = ["Codigo", "Nombre", "Descripcion", "Existencia", "Precio", "Agregar"]
    const headerRemove = ["Codigo", "Nombre", "Descripcion", "Cantidad", "Precio", "Quitar"]

    return(
        <div className="venta">
            <h1>Venta</h1>
            <h3 id="h3-cliente"><strong>Datos de facturación:</strong> <br/>Cliente: <i>{clienteSeleccionado === '' ? 'No ha seleccionado un cliente aun' : `${clienteSeleccionado.nombre}, ${clienteSeleccionado.identificacion}, ${clienteSeleccionado.ciudad}`}</i></h3>
            {productosEnVenta.length === 0 ? '' : 
                <div>
                    <h3>Productos agregados:</h3>
                    <table className="table table-striped table-productos-agregados">
                        <thead>
                            <tr>{headerRemove.map((th, i) => <th key={i}>{th}</th> )}</tr>
                        </thead>
                        <tbody>
                            {productosEnVenta.map((producto, index) => {
                                return(
                                    <tr key={producto.id_producto}>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.descripcion}</td>
                                        <td><input type="number" onChange={e => comprobarCantidades(producto, e, index)}/></td>
                                        <td>{producto.valorVenta}</td>
                                        <td>
                                            <button type="button" className="btn btn-outline-danger" onClick={() => removeProductoDeVenta(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-primary btn-terminar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Terminar
                    </button>
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Confirmación</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    ¿Está seguro que desea terminar la venta?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={terminarVenta}>Terminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="accordion" id="accordion">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Seleccione el cliente
                    </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {clienteSeleccionado === "" ? <span>Seleccione un cliente: </span> : `Cliente: ${clienteSeleccionado.name}`}
                        <table className="table table-striped cliente-table">
                            <tbody>
                                {
                                    clientes.map(cliente => {
                                        return(
                                            <tr key={cliente.id_cliente} onClick={() => setClienteSeleccionado(cliente)}>
                                                <td>{cliente.id_cliente}</td>
                                                <td>{cliente.nombre}</td>
                                                <td>{cliente.identificacion}</td>
                                                <td>{cliente.telefono}</td>
                                                <td>{cliente.ciudad}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Productos
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>{headerAdd.map((th, i) => <th key={i}>{th}</th> )}</tr>
                            </thead>
                            <tbody>
                                {productos.map(producto => {
                                    return(
                                        <tr key={producto.id_producto}>
                                            <td>{producto.codigo}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>{producto.existencia}</td>
                                            <td>{producto.valorVenta}</td>
                                            <td>
                                                {/* PLUS */}
                                                <button type="button" className="btn btn-success" onClick={() => addProductoAVenta(producto)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}