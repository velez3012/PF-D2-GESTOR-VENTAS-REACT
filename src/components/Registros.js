import { useEffect, useState } from "react"

export const Registros = () => {
    const [criterioBusqueda, setCriterioBusqueda] = useState('')
    const [productosPorCliente, setProductosPorCliente] = useState([])
    const [facturas, setFacturas] = useState([])
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        if(criterioBusqueda === ''){
            fetch(`http://localhost:3001/ventas`)
            .then(res => res.json())
            .then(res => setFacturas(res))
        }else{
            fetch(`http://localhost:3001/ventas/${criterioBusqueda}`)
                .then(res => res.json())
                .then(res => setFacturas(res))
        }
    }, [criterioBusqueda])

    useEffect(() => {
        fetch('http://localhost:3001/clientes')
        .then(res => res.json())
        .then(res => setClientes(res))
    }, [])

    const buscarPorCliente = cliente => {
        setCriterioBusqueda('')
        fetch(`http://localhost:3001/ventasByCliente/${cliente.id_cliente}`)
            .then(res => res.json())
            .then(res => setFacturas([].concat(res)))
    }


    const headerClientes = ["Nombre", "Identificacion"]
    const headerFacturas = ["Codigo", "Fecha", "Cantidad", "Valor total"]

    return(
        // CLIENTES
        <div className="registros">
            <div className="header">
                <div className="filtro-por-cliente">
                    <h2>Filtre por clientes</h2>
                    <table className="table table-striped table-clientes">
                        <thead>
                            <tr>{headerClientes.map((th, i) => <th key={i}>{th}</th> )}</tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => {
                                return(
                                    <tr key={cliente.id_cliente}>
                                        <td onClick={() => buscarPorCliente(cliente)} className="td-cliente-nombre">{cliente.nombre}</td>
                                        <td>{cliente.identificacion}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="filtro-por-codigo">
                    <input type="text" placeholder="Busca aquí por codigo de factura" onChange={e => setCriterioBusqueda(e.target.value)} value={criterioBusqueda}/>
                </div>
            </div>
            <div className="facturas">
                    <table className="table table-striped table-facturas">
                        <thead>
                            <tr>{headerFacturas.map((th, i) => <th key={i}>{th}</th> )}</tr>
                        </thead>
                        <tbody>
                            {facturas.map(factura => {
                                return(
                                    <tr key={factura.id_venta}>
                                        <td>{factura.codigo}</td>
                                        <td>{factura.fecha}</td>
                                        <td>{factura.cantidad}</td>
                                        <td>{factura.valorTotal}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
            </div>
        </div>
    )
}