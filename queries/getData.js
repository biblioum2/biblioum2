const { getRandomValues } = require("crypto");
const pool = require("../config/database");

// OBTENCION DE LIBROS GENERAL

const getBooks = async () => {
  const query = `
SELECT *
FROM books
WHERE id >= (SELECT floor(random() * (SELECT max(id) FROM books)))
ORDER BY id
LIMIT 10;
  `;
  try {
    const res = await pool.query(query);
    console.log(`LIBROS: ${res.rows}`);
    return res.rows;
  } catch (error) {
    console.log("Error al obtener los libros", error);
  }
};

// OBTENCION DE LIBROS POR CATEGORIA

const getBooksForCategory = async (name, limit, offset) => {
  const query = `
SELECT b.id, b.title, b.author, b.isbn, b.publication_year, b.available_copies
FROM books b
JOIN book_categories bc ON b.id = bc.book_id
JOIN categories c ON bc.category_id = c.id
WHERE c.name = $1
ORDER BY b.id
LIMIT $2 OFFSET $3;

    `;
  const values = [name, limit, offset];
  try {
    const res = await pool.query(query, values);
    console.log(`LIBROS POR CATEGORIA: ${res.rows}`);
    return res.rows;
  } catch (error) {
    console.log("Error al obtener los datos", error);
  }
};


const getUsers = async (offset) => {
  const query = `
  SELECT *
  FROM users
  LIMIT 10 OFFSET $1
  `;
    const values = [offset];
    try {
      const res = await pool.query(query, values);
      return res.rows;
    } catch (error) {
      console.log("Error al consultar usuario", error);
      throw error;
    }
  };
  
  // OBTENER EL USUARIO PARA VALIDAR INICIO

const getUser = async (name) => {
  const query = `
        SELECT * FROM users
        WHERE username = $1;
    `;
  const value = [name];
  try {
    const res = await pool.query(query, value);
    console.log("El get user usuario es: ", res.rows[0]);
    return res.rows;
  } catch (error) {
    console.log("Error al consultar usuario", error);
    throw error;
  }
};



module.exports = {
  getBooks,
  getUser,
  getUsers,
};
