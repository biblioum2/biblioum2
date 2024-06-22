const express = require('express');
const router = express.Router();
const { getBooks } = require('../queries/getData');

// Ruta para la página principal
router.get('/', async (req, res) => {
  try {
    const books = await getBooks();
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
