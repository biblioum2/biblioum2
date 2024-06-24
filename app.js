require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const pool = require('./config/database'); // Importa la configuración de la base de datos
const { getUser } = require('./queries/getData'); 

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(session({
  secret: process.env.COOKIE_TOKEN,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 día
    secure: false, // Asegúrate de que sea false cuando estés en desarrollo (local)
    httpOnly: true, // Esto ayuda a proteger la cookie de ataques XSS
  }
}));


// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const indexRouter = require('./routes/main');

app.use('/', indexRouter);

app.post('/login', async (req, res) => {
  const {username, password, remember} = req.body;
  console.log(remember);
  try {
      const data = await getUser(username, password);
      if (data.length > 0) {
        const user = data[0];
        if (user.password_hash == password ) {
          req.session.user = { id: user.user_id, username: user.username };
          if (remember === 'on') {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 dias
          } else {
            req.session.cookie.expires = false;
          }
          console.log('session: ', req.session);
          res.redirect('/main');
        } else {
          res.render('login', { authErrorName: false, authErrorPassword: true, username: user.username });
        }
      } else {
        res.render('login', { username: username, authErrorName: true, authErrorPassword: false });
      }
  } catch (error) {
    console.log('Error al validar usuario: ', error);
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
