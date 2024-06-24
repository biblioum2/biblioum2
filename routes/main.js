const express = require('express');
const router = express.Router();
const { getBooks } = require('../queries/getData');

// Ruta para formulario login
router.get('/', (req, res) => {
  res.render('login', {title: 'login', username: undefined, authErrorName: false, authErrorPassword: false})
});

// Ruta para la página principal
router.get('/main', async (req, res) => {
  try {
    const books = await getBooks();
    console.log(`Esto es el resultado en main books: ${books}`);
    res.render('main', { title: 'Página de Inicio', books });
  } catch (error) {
    console.log(`Error al consultar`, error);
    res.status(500).send('Error al obtener los libros main');
  }
});

// Otras rutas básicas pueden ir aquí
router.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de' });
});

module.exports = router;
