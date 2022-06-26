const express = require('express');
const { route } = require('./routes/ventas');
const app = express()

app.set('port', process.env.PORT ||3001)

//middlewares
app.use(express.json())

//configurar cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes
app.use(require('./routes/ventas'))
app.use(require('./routes/json'))
app.use(require('./routes/productos'))
app.use(require('./routes/clientes'))

app.listen(app.get('port'), () => {
    console.log('SERVER RUNNING ON ', app.get('port'))
})

