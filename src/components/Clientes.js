import { useEffect, useState } from "react"

export const Clientes = () => {
    const [clientes, setClientes] = useState([])
    const [clienteSeleccionado, setClienteSeleccionado] = useState('')
    const [clienteNuevo, setClienteNuevo] = useState({})
    const [creando, setCreando] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3001/clientes')
        .then(res => res.json())
        .then(res => setClientes(res))
    }, [])

    const enviarClienteNuevo = e => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(clienteNuevo);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3001/cliente", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        setCreando(false)
    }

    const editarCliente = cliente => {
        setClienteSeleccionado(cliente)
    }

    const quitarSeleccionCliente = () => {
        setClienteSeleccionado('')
    }

    const terminarEdicion = e => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(clienteSeleccionado);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3001/cliente", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    const setNombreEditar = e => {
        clienteSeleccionado.nombre = e.target.value
    }
    const setIdentificacionEditar = e => {
        clienteSeleccionado.identificacion = e.target.value
    }
    const setTelefonoEditar = e => {
        clienteSeleccionado.telefono = e.target.value
    }
    const setDireccionEditar = e => {
        clienteSeleccionado.direccion = e.target.value
    }
    const setCiudadEditar = e => {
        clienteSeleccionado.ciudad = e.target.value
    }

    const setNombreCrear = e => {
        clienteNuevo.nombre = e.target.value
    }
    const setIdentificacionCrear = e => {
        clienteNuevo.identificacion = e.target.value
    }
    const setTelefonoCrear = e => {
        clienteNuevo.telefono = e.target.value
    }
    const setDireccionCrear = e => {
        clienteNuevo.direccion = e.target.value
    }
    const setCiudadCrear = e => {
        clienteNuevo.ciudad = e.target.value
    }

    const header = ["Nombre", "Identificacion", "Telefono", "Direccion", "Ciudad", "Acciones"]
    
    return (
        <div className="clientes">

            {/* AQUI INICIA LA COMPROBACION PARA MOSTRAR EL FORM DE EDITAR USUARIO */}
            {clienteSeleccionado === '' ? '' : 
                <div className="editar-cliente">
                {/* BOTON CERRAR EDITAR CLIENTE */}
                    <button className="btn-outline-secondary btn-cerrar-editar-cliente" onClick={quitarSeleccionCliente}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>

                    <h2>Editar cliente: {clienteSeleccionado.nombre}</h2>
                    <form onSubmit={terminarEdicion}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Nombre</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Nuevo nombre" aria-label="Username" aria-describedby="basic-addon1" value={clienteSeleccionado.nombre} autoFocus required onChange={setNombreEditar}/>
                        </div>

                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="Nueva identificacion" aria-label="Recipient's username" aria-describedby="basic-addon2" value={clienteSeleccionado.identificacion} required onChange={setIdentificacionEditar}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Identificacion</span>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Telefono</span>
                            </div>
                            <input type="number" className="form-control" placeholder="Nuevo telefono" aria-label="Username" aria-describedby="basic-addon1" value={clienteSeleccionado.telefono} required onChange={setTelefonoEditar}/>
                        </div>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nueva direccion" aria-label="Recipient's username" aria-describedby="basic-addon2" value={clienteSeleccionado.direccion} required onChange={setDireccionEditar}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Direccion</span>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Ciudad</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Nueva ciudad" aria-label="Username" aria-describedby="basic-addon1" value={clienteSeleccionado.ciudad} required onChange={setCiudadEditar}/>
                        </div>
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
                    {/* BOTON TERMINAR EDICION */}
                    <button type="button" className="btn btn-primary btn-terminar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Terminar edicion
                    </button>
                    {/* FIN BOTON TERMINAR EDICION */}
                
                </div>
            }
            {/* AQUI TERMINA LA COMPROBACION PARA MOSTRAR EL FORM PARA EDITAR USUARIO */}



            {/* AQUI INICIA LA COMPROBACION PARA MOSTRAR EL BOTON PARA CREAR CLIENTE */}
            {clienteSeleccionado !== '' || (creando) ? '' : 
                <div className="div-btn-crear-cliente">
                    <button type="button" className="btn btn-success create-cliente" onClick={() => setCreando(true)}>
                        Crear
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                    </button>
                </div>
            }
            {/* AQUI TERMINA LA COMPROBACION PARA MOSTRAR BOTON PARA CREAR CLIENTE */}

            {/* AQUI INICIA LA COMPROBACION PARA MOSTRAR FORM PARA CREAR CLIENTE */}
            {!creando ? '' :
                <div className="crear-cliente">
                    <button className="btn-outline-secondary btn-cerrar-crear-cliente" onClick={() => setCreando(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>                    
                    
                    <h2>Crear un nuevo cliente</h2>
                    <form onSubmit={enviarClienteNuevo}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Nombre</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Nuevo nombre" aria-label="Username" aria-describedby="basic-addon1" required onChange={setNombreCrear}/>
                        </div>

                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="Nueva identificacion" aria-label="Recipient's username" aria-describedby="basic-addon2" required onChange={setIdentificacionCrear}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Identificacion</span>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Telefono</span>
                            </div>
                            <input type="number" className="form-control" placeholder="Nuevo telefono" aria-label="Username" aria-describedby="basic-addon1" required onChange={setTelefonoCrear}/>
                        </div>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nueva direccion" aria-label="Recipient's username" aria-describedby="basic-addon2" required onChange={setDireccionCrear}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Direccion</span>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Ciudad</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Nueva ciudad" aria-label="Username" aria-describedby="basic-addon1" required onChange={setCiudadCrear}/>
                        </div>
                        {/* MODAL CREAR CLIENTE */}
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
            {/* AQUI TERMINA LA COMPROBACION PARA MOSTRAR FORM PARA CREAR CLIENTE */}

            <h1>Clientes</h1>
            <table className="table table-striped table-clientes">
                <thead>
                    <tr>{header.map((th, i) => <th key={i}>{th}</th> )}</tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => {
                        return(
                            <tr key={cliente.id_cliente}>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.identificacion}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.direccion}</td>
                                <td>{cliente.ciudad}</td>
                                <td>
                                    {/* BOTON EDITAR CLIENTE */}
                                    <button type="button" className="btn btn-primary" onClick={() => editarCliente(cliente)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    {/* BOTON ELIMINAR CLIENTE */}
                                    <button type="button" className="btn btn-outline-danger" >
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
        </div>
    )
}