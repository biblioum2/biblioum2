const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { getBooks } = require('../queries/getData');

// router.use(cookieParser());

// Ruta para formulario login
router.get('/login', (req, res) => {

    res.render('login', {
      title: 'login',
      username: undefined,
      authErrorName: false,
      authErrorPassword: false
    });
  
});

router.get('/logout', (req, res) => {
  res.clearCookie('authToken'); // Borra la cookie 'authToken'
  res.redirect('/login');
});

// Ruta para la página principal

router.get('/', async (req, res) => {

  const authToken = req.cookies.authToken ? true : false;

  try {
    const books = await getBooks();
    console.log(`Esto es el resultado en main books: ${books}`);
    res.render('main', { title: 'Página de Inicio', books, authToken: authToken });
  } catch (error) {
    console.log(`Error al consultar`, error);
    res.status(500).send('Error al obtener los libros main');
  }
});

router.get('/admin', (req, res) => {
  res.render('admin', { title: 'admin' });
});

router.get('/book', (req, res) => {
  res.render('book', { title: 'book' });
});

// Otras rutas básicas pueden ir aquí
router.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de' });
});

module.exports = router;
