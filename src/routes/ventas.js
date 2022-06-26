const express = require('express')
const app = express()
const router = express.Router()
const conn = require('../database/connection.js')

router.post('/venta', (req, res) => {

    const codigoRandom = length => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const cliente = req.body.cliente
    const productos = req.body.productos

    var cantidadProductos = 0
    var valorTotalVenta = 0
    productos.forEach(producto => {
        cantidadProductos += producto.cantidad
        valorTotalVenta += producto.cantidad * producto.valorVenta
    })

    var m = new Date();
    var dateString =
        m.getUTCFullYear() + "/" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);

    var codigoR = codigoRandom(10)
    conn.query('INSERT INTO ventas (id_venta, id_cliente, codigo, fecha, cantidad, valorTotal) VALUES (?, ?, ?, ?, ?, ?)', 
        [
            0,
            cliente.id_cliente,
            codigoR,
            m,
            cantidadProductos,
            valorTotalVenta,

        ], 
        (err, rows, fields) => {
            err ? console.log(`Error, ${err}`) : res.json({
                Status : 'Venta insertada correctamente'
            })
        }
    )

    //VENTA - ID_VENTA = 1 - CANTIDAD = 3 - VALORTOTAL = 3000
    
    //PRODUCTO - ID_PRODUCTO = 1 - NOMBRE = MANZANA -   EXISTENCIA 10 - VALORVENTA = 1000
    //PRODUCTO - ID_PRODUCTO = 2 - NOMBRE = PERA -      EXISTENCIA 10 - VALORVENTA = 1000

    //VENTAS-PRODUCTOS - ID_VENTAS = 1 - ID_PRODUCTO = 1 - CANTIDAD = 1 - VALORTOTAL = 1000
    //VENTAS-PRODUCTOS - ID_VENTAS = 1 - ID_PRODUCTO = 2 - CANTIDAD = 2 - VALORTOTAL = 2000

    // OBTENEMOS EL ID DE LA VENTA QUE ACABAMOS DE INSERTAR
    conn.query('SELECT * FROM ventas WHERE codigo = ?', [codigoR], (err, rows, fields) => {
        productos.forEach(producto => {
            const valorVenta = producto.cantidad * producto.valorVenta
            conn.query('INSERT INTO ventas_productos (id_venta, id_producto, cantidad, valorVenta) VALUES (?, ?, ?, ?)',
            [
                rows[0].id_venta,
                producto.id_producto,
                producto.cantidad,
                valorVenta
            ],
            (err, rows, fields) => {
                if(err) console.log('Error en ventas-productos - ', err)
            })
        })
    })
    

    const errores = []
    productos.forEach(producto => {
        const error = false
        const cantidad = producto.existencia - producto.cantidad
        conn.query('UPDATE productos SET existencia = ? WHERE id_producto = ?',
        [
            cantidad,
            producto.id_producto
        ],
        (err, rows, fields) => {
            if(err) {
                console.log(`Error ${err}`)
                error = true
            }
        })
        errores.push(error)
    })

    
})

router.get('/ventas/:codigo', (req, res) => {
    const { codigo } = req.params
    conn.query(`SELECT * FROM ventas WHERE codigo LIKE '%${codigo}%'`, (err, rows, fields) => {
        err ? console.log(`Error en ventas/${codigo}`, err) : res.json(rows)
    })
})

router.get('/ventas', (req, res) => {
    conn.query('SELECT * FROM ventas', (err, rows, fields) => {
        res.json(rows)
    })
})

router.get('/ventasByCliente/:id_cliente', (req, res) => {
    const { id_cliente } = req.params

    conn.query('SELECT * FROM ventas WHERE id_cliente = ?', [id_cliente], (err, rows, fields) => {
        err ? console.log(`Error al traer ventas por id_cliente = ${id_cliente}`) 
            : res.json(rows)
    })
})


module.exports = router