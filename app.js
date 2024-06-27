require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require('cookie-parser');
const pool = require("./config/database"); // Importa la configuración de la base de datos
const { getUser } = require("./queries/getData");

const app = express();
const port = 2000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rutas
const indexRouter = require("./routes/main");

app.use("/", indexRouter);

app.post("/login", async (req, res) => {
  const { username, password, remember } = req.body;
  console.log(remember);
  try {
    const data = await getUser(username, password);
    if (data.length > 0) {
      const user = data[0];
      if (user.password_hash == password) {

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

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
