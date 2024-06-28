const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { getBooks } = require('../queries/getData');

router.use(cookieParser());

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
  const isAdmin = req.cookies.isAdmin ? true : false;
console.log('is admin desde main? ', isAdmin);
  try {
    const books = await getBooks();
    // console.log(`Esto es el resultado en main books: ${books}`);
    res.render('main', { title: 'Página de Inicio', books, authToken: authToken, isAdmin: isAdmin });
  } catch (error) {
    console.log(`Error al consultar`, error);
    res.status(500).send('Error al obtener los libros main');
  }
});

router.get('/admin', (req, res) => {
  const isAdmin = req.cookies.isAdmin;
  if (isAdmin) {
    res.render('admin', { title: 'admin' });
  } else {
    res.redirect('/');
  }
});

router.get('/admin/users', (req, res) => {
  res.render('users', { title: 'users' });
});

// Otras rutas básicas pueden ir aquí
router.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de' });
});

module.exports = router;
