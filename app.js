require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const pool = require("./config/database"); // Importa la configuración de la base de datos
const { getUser } = require("./queries/getData");
const { insertUser, insertBook } = require("./queries/inputData");

const app = express();
const port = 2000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuracion de session
app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true
}));

// Rutas
const indexRouter = require("./routes/main");
app.use("/", indexRouter);

// Ruta POST para agregar un usuario con validación de datos
app.post("/admin/users", async (req, res) => {
  const { username, password, email, role } = req.body;
  
  try {
    await insertUser(username, password, email, role);
    res.redirect('/admin/users/success');
  } catch (error) {
    console.log("Error al agregar usuario: ", error);
    res.status(500).render('users', { title: 'users', currentPage: 'users', success: false });
  }
});



app.post("/login", async (req, res) => {
  const { username, password, remember } = req.body;

  try {
    const data = await getUser(username, password);
    if (data.length > 0) {
      const user = data[0];
      if (user.password_hash == password) {
        // EVALUAR EL ROL DEL USUARIO
        const isAdmin = user.role == `admin` ? true : false;
        console.log("Es admin desde app? ", isAdmin);
        const authToken = `${user.user_id}-${Math.random()
          .toString(36)
          .substring(7)}`;

        // Establecer cookie de autenticación
        const cookieOptions = {
          maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 30 días si se selecciona "Remember Me", 1 día si no
          httpOnly: true, // La cookie solo es accesible mediante HTTP
          sameSite: "strict", // Limita el alcance de la cookie a la misma origin
        };
        res.cookie("authToken", authToken, cookieOptions);
        res.cookie("isAdmin", isAdmin, cookieOptions);
        req.session.user = data[0];
        res.redirect("/");
      } else {
        res.render("login", {
          authErrorName: false,
          authErrorPassword: true,
          username: user.username,
        });
      }
    } else {
      res.render("login", {
        username: username,
        authErrorName: true,
        authErrorPassword: false,
      });
    }
  } catch (error) {
    console.log("Error al validar usuario: ", error);
  }
});

app.post("/admin/books", async (req, res) => {
  const {
    title,
    edition,
    author,
    categoryId,
    publicationDate,
    isbn,
    summary,
    available,
    image,
  } = req.body;
  try {
    insertBook(
      title,
      edition,
      author,
      categoryId,
      publicationDate,
      isbn,
      summary,
      available,
      image
    );
    res.render("books");
  } catch (error) {
    console.log("Error al agregar libro: ", error);
  }
});
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
