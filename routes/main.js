const express = require('express');
const router = express.Router();

// Ruta para la página principal
router.get('/', (req, res) => {
  res.render('/views/main.ejs', { title: 'Página de Inicio' });
});

// Otras rutas básicas pueden ir aquí
router.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de' });
});

module.exports = router;
