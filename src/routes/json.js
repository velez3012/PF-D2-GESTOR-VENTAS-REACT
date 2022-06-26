const express = require('express')
const app = express()
const router = express.Router()
const conn = require('../database/connection.js')

router.get('/json', (req, res) => {
    res.json({
        status : 200
    })
})

module.exports = router