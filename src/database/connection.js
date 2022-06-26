const mysql = require('mysql')

const connection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password : "",
    database : "inventorydb"
})

connection.connect(e => {
    e ? console.log(e, "error") : console.log('Connection successful')
})

module.exports = connection