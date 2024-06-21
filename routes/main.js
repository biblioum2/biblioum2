const express = require('express');
const router = express.Router();

// Ruta para la página principal
router.get('/', (req, res) => {
  res.render('main', { title: 'Página de Inicio' });
});

// Otras rutas básicas pueden ir aquí
router.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de' });
});

module.exports = router;
