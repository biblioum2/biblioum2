const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { getBooks, getUsers } = require('../queries/getData');

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
  res.clearCookie('isAdmin');
  res.clearCookie('username');
  res.clearCookie('email');
  res.redirect('/login');
});

// Ruta para la página principal

router.get('/', async (req, res) => {

  const user = req.session.user;
  const authToken = req.cookies.authToken ? true : false;
  const isAdmin = req.cookies.isAdmin ? true : false;
  const username = req.cookies.username;
  const email = req.cookies.email;
  try {
    const books = await getBooks();
    console.log(`Esto es el resultado en main books: ${books}`);
    res.render('main', { title: 'Página de Inicio',books: books, authToken: authToken, isAdmin: isAdmin, user: user, });
  } catch (error) {
    console.log(`Error al consultar`, error);
    res.status(500).send('Error al obtener los libros main');
  }
});

router.get('/admin', (req, res) => {
  const isAdmin = req.cookies.isAdmin;
  if (isAdmin) {
    res.render('admin', { title: 'admin', currentPage: 'admin' });
  } else {
    res.redirect('/');
  }
});

router.get('/admin/users', async (req, res) => {
  const users = await getUsers(0);
  res.render('users', { title: 'users', users: users, currentPage: 'users',success: undefined, postResponse: false});
});

// Otras rutas básicas pueden ir aquí
router.get('/admin/users/success', async (req, res) => {
  const users = await getUsers(0);
  res.render('users', { title: 'users', users: users, currentPage: 'users', success: true });
});


router.get('/admin/books', (req, res) => {
  res.render('books', { title: 'libros', currentPage: 'books', bookAdded: undefined, postResponse: false});
});
module.exports = router;
