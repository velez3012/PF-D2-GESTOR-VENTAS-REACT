const express = require('express')
const router = express.Router()
const conn = require('../database/connection.js')

router.get('/clientes', (req, res) => {
    conn.query('SELECT * FROM clientes', (err, rows, fields) => {
        err ? console.log(err, "error") : res.json(rows)
    })
})

router.post('/cliente', (req, res) => {
    conn.query('INSERT INTO clientes (id_cliente, nombre, identificacion, direccion, telefono, ciudad) VALUES (?, ?, ?, ?, ?, ?)', 
    [
        0,
        req.body.nombre,
        req.body.identificacion,
        req.body.direccion,
        req.body.telefono,
        req.body.ciudad
    ], (err, rows, fields) => {
        err ? console.log(`Error ${err}`) : res.json({
            Status : 'Client inserted correctly'
        })
    })
})

router.put('/cliente', (req, res) => {
    conn.query('UPDATE clientes SET nombre = ?, identificacion = ?, direccion = ?, telefono = ?, ciudad = ? WHERE id_cliente = ?', 
    [
        req.body.nombre,
        req.body.identificacion,
        req.body.direccion,
        req.body.telefono,
        req.body.ciudad,
        req.body.id_cliente
    ], (err, rows, fields) => {
        err ? console.log(`Error ${err}`) : res.json({
            Status : 'Client inserted correctly'
        })
    })
})

module.exports = router