const express = require('express')
const router = express.Router()
const conn = require('../database/connection.js')

router.get('/productos', (req, res) => {
    conn.query('SELECT * FROM productos', (err, rows, fields) => {
        err ? console.log(err, "error") : res.json(rows)
    })
})

router.post('/compra', (req, res) => {
    conn.query('INSERT INTO productos (id_producto, codigo, nombre, descripcion, valorVenta, costoUnitario, existencia, puntoReorden) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 
    [
        0,
        req.body.codigo,
        req.body.nombre,
        req.body.descripcion,
        req.body.valorVenta,
        req.body.costoUnitario,
        req.body.existencia,
        req.body.puntoReorden
    ], (err, rows, fields) => {
        err ? console.log(err) : res.json({
            Status : "Product" + req.body.nombre + "added in productos table"
        })
    })
})

router.put('/producto', (req, res) => {
    conn.query('UPDATE productos SET codigo = ?, nombre = ?, descripcion = ?, valorVenta = ?, costoUnitario = ?, existencia = ?, puntoReorden = ? WHERE id_producto = ?', 
    [
        req.body.codigo,
        req.body.nombre,
        req.body.descripcion,
        parseFloat(req.body.valorVenta),
        parseFloat(req.body.costoUnitario),
        parseInt(req.body.existencia),
        parseInt(req.body.puntoReorden),
        parseInt(req.body.id_producto)
    ], (err, rows, fields) => {
        err ? console.log(`Error ${err}`) : res.json({
            Status : 'Client inserted correctly'
        })
    })
})

module.exports = router