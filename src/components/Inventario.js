import { useEffect, useState } from "react"

export const Inventario = () => {
    const [productos, setProductos] = useState([])
    const [editando, setEditando] = useState(false)
    const [creando, setCreando] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState('')
    const [productoNuevo, setProductoNuevo] = useState({})

    useEffect(() => {
        fetch("http://localhost:3001/productos").then(res => res.json())
        .then(res => {
            setProductos(res)
        })
        .catch(e => console.log(e))
    }, [])

    const eliminarProducto = producto => {

    }

    const editarProducto = producto => {
        setEditando(true)
        setCreando(false)
        setProductoSeleccionado(producto)
    }

    const terminarEdicion = e => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(productoSeleccionado);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3001/producto", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        setEditando(false)
    }

    const enviarNuevoProducto = e => {
        e.preventDefault()

        console.log(productoNuevo)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(productoNuevo);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3001/compra", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        setCreando(false)
    }

    const quitarSeleccionProducto = () => {
        setProductoSeleccionado('')
        setEditando(false)
    }


    const setNombreEditar = e => {
        productoSeleccionado.nombre = e.target.value
    }
    const setDescripcionEditar = e => {
        productoSeleccionado.descripcion = e.target.value
    }
    const setValorVentaEditar = e => {
        productoSeleccionado.valorVenta = e.target.value
    }
    const setCostoUnitarioEditar = e => {
        productoSeleccionado.costoUnitario  = e.target.value
    }
    const setExistenciaEditar = e => {
        productoSeleccionado.existencia= e.target.value
    }
    const setPuntoReordenEditar = e => {
        productoSeleccionado.puntoReorden = e.target.value
    }

    const setCodigoEditar = e => {
        productoSeleccionado.codigo = e.target.value
    }

    const setNombreCrear = e => {
        productoNuevo.nombre = e.target.value
    }
    const setDescripcionCrear = e => {
        productoNuevo.descripcion = e.target.value
    }
    const setValorVentaCrear = e => {
        productoNuevo.valorVenta = e.target.value
    }
    const setCostoUnitarioCrear = e => {
        productoNuevo.costoUnitario = e.target.value
    }
    const setExistenciaCrear = e => {
        productoNuevo.existencia = e.target.value
    }
    const setPuntoReordenCrear = e => {
        productoNuevo.puntoReorden = e.target.value
    }
    const setCodigoCrear = e => {
        productoNuevo.codigo = e.target.value
    }


    const header = ["Codigo", "Nombre", "Descripcion", "Precio", "Cantidad", "Acciones"]

    return (
        <div className="inventario">
            {!editando ? '' : 
            <div className="div-editar-producto">
                <h3>Editando producto: {productoSeleccionado.nombre}</h3>
                <button className="btn-outline-secondary btn-cerrar-editar-producto" onClick={quitarSeleccionProducto}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
                <form onSubmit={terminarEdicion}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Nombre</span>
                        </div>
                        <input type="text" className="form-control" placeholder={productoSeleccionado.nombre} aria-label="Username" aria-describedby="basic-addon1" autoFocus required onChange={setNombreEditar}/>
                    </div>

                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder={productoSeleccionado.descripcion} aria-label="Recipient's username" aria-describedby="basic-addon2" required onChange={setDescripcionEditar}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Descripcion</span>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Valor de venta</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder={productoSeleccionado.valorVenta} required onChange={setValorVentaEditar}/>
                    </div>

                    <div className="input-group mb-3">
                        <input type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2" placeholder={productoSeleccionado.costoUnitario} required onChange={setCostoUnitarioEditar}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Costo unitario</span>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Existencia</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder={productoSeleccionado.existencia} required onChange={setExistenciaEditar}/>
                    </div>

                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder={productoSeleccionado.puntoReorden} aria-label="Recipient's username" aria-describedby="basic-addon2" required onChange={setPuntoReordenEditar}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Punto de reorden</span>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Codigo</span>
                        </div>
                        <input type="number" className="form-control" placeholder={productoSeleccionado.codigo} aria-label="Username" aria-describedby="basic-addon1" required onChange={setCodigoEditar}/>
                    </div>

                    {/* BOTON TERMINAR EDICION */}
                    <button type="button" className="btn btn-primary btn-terminar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Terminar edicion
                    </button>
                    {/* FIN BOTON TERMINAR EDICION */}
                    
                    {/* MODAL PARA COMPROBACION TERMINAR EDICION */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Confirmación</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    ¿Está seguro que desea terminar la edicion?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Terminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* FIN MODAL PARA COMPROBACION FIN EDICION */}
                </form>  
            </div>  
            }
            {productoSeleccionado !== '' || (creando) ? '' : 
                <div className="div-btn-crear-producto">
                    <button type="button" className="btn btn-success btn-create-cliente" onClick={() => {
                            setCreando(true)
                            setEditando(false)
                        }}>
                        Crear
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                    </button>
                </div>
            }
            {!creando ? '' :
                <div className="crear-cliente">
                    <button className="btn-outline-secondary btn-cerrar-crear-producto" onClick={() => setCreando(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>                    
                    
                    <h2>Crear un nuevo producto</h2>
                    <form onSubmit={enviarNuevoProducto}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Nombre</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Nuevo nombre" aria-label="Username" aria-describedby="basic-addon1" autoFocus required onChange={setNombreCrear}/>
                        </div>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nueva descripcion" aria-label="Recipient's username" aria-describedby="basic-addon2" required onChange={setDescripcionCrear}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Descripcion</span>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Valor de venta</span>
                            </div>
                            <input type="number" className="form-control" placeholder="Nuevo valor de venta" aria-label="Username" aria-describedby="basic-addon1" required onChange={setValorVentaCrear}/>
                        </div>

                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="Nueva costo unitario" aria-label="Recipient's username" aria-describedby="basic-addon2" required onChange={setCostoUnitarioCrear}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Costo unitario</span>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Existencia</span>
                            </div>
                            <input type="number" className="form-control" placeholder="Nueva existencia" aria-label="Username" aria-describedby="basic-addon1" required onChange={setExistenciaCrear}/>
                        </div>

                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="Nuevo punto de reorden" aria-label="Recipient's username" aria-describedby="basic-addon2" required onChange={setPuntoReordenCrear}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Punto de reorden</span>
                            </div>
                        </div>
                        
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Codigo</span>
                            </div>
                            <input type="number" className="form-control" placeholder="Nuevo codigo" aria-label="Username" aria-describedby="basic-addon1" required onChange={setCodigoCrear}/>
                        </div>

                        {/* MODAL CREAR PRODUCTO */}
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Confirmación</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        ¿Todos los datos son correctos?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Terminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* FIN MODAL CREAR CLIENTE */}
                        {/* BOTON TERMINAR EDICION */}
                        <button type="button" className="btn btn-primary btn-terminar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Terminar
                        </button>
                        {/* FIN BOTON TERMINAR EDICION */}
                    </form>
                </div>
            }
            <h2>Inventario</h2>
            <table className="table table-striped">
                <thead>
                    <tr>{header.map((th, i) => <th key={i}>{th}</th> )}</tr>
                </thead>
                <tbody>
                    {productos.map(producto => {
                        const url = `/inventario/name=${producto.nombre}`
                        return(
                            <tr key={producto.id_producto}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.valorVenta}</td>
                                <td>{producto.existencia}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger quitar-producto"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path></svg></button>
                                    <button type="button" className="btn btn-primary editar-producto" onClick={() => editarProducto(producto)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path></svg></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </div>
    )
}