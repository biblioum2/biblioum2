const pool = require("../config/database");

// OBTENCION DE LIBROS

const getBooks = async () => {
  const query = `
        SELECT books.book_id, books.title, authors.name AS author, categories.name AS category, books.publication_date, books.isbn, books.summary, books.cover_image_filename
        FROM books
        JOIN authors ON books.author_id = authors.author_id
        JOIN categories ON books.category_id = categories.category_id;
    `;

  try {
    const res = await pool.query(query);
    // console.log(res.rows);
    return res.rows;
  } catch (error) {
    console.log("Error al obtener los datos", error);
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
    // console.log("El usuario es: ", res.rows[0]);
    return res.rows;
  } catch (error) {
    console.log("Error al consultar usuario", error);
    throw error;
  }
};

// VERIFICAR SI UN LIBRO ESTA DISPONIBLE

const getBookDisp = async (id) => {
  const query = `
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM orders 
            WHERE book_id = $1 AND status = 'Prestado' AND return_date IS NULL
        ) THEN 'Prestado'
        ELSE 'Disponible'
    END AS disponibilidad;
    `;

const value = [id];
try {
    const res = pool.query(query, value);
    return res.rows[0];
} catch (error) {
    console.log(`Error al consultar disponibilidad del libro`, error);
}
};

module.exports = {
  getBooks,
  getUser,
  getBookDisp,
};
