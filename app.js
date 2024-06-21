const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./config/database'); // Importa la configuración de la base de datos

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const indexRouter = require('./routes/main');

app.use('/', indexRouter);


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
