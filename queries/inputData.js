const pool = require('../config/database');


// Función para insertar un usuario
const insertUser = async (username, passwordHash, email, role) => {
  const query = `
    INSERT INTO users (username, password_hash, email, role) 
    VALUES ($1, $2, $3, $4)
  `;
  const values = [username, passwordHash, email, role];

  try {
    const res = await pool.query(query, values);
    console.log('Usuario insertado:', res.rows);
    return res.rows[0];  // Opcional: devolver el usuario insertado
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    throw error;  // Propagar el error para manejarlo en un nivel superior
  }
};


// Función para insertar una categoria
const insertCategory = async (name) => {
  const query = `
    INSERT INTO categories (name)
    VALUES ($1)
  `;
  const values = [name];

  try {
    const res = await pool.query(query, values);
    console.log('Categoría insertada:', res.rows[0]);
    return res.rows[0];  // Opcional: devolver la categoría insertada
  } catch (error) {
    console.error('Error al insertar categoría:', error);
    throw error;  // Propagar el error para manejarlo en un nivel superior
  }
};


// Función para insertar un libro
const insertBook = async (title, author, isbn, publicationYear, availableCopies) => {
  const query = `
    INSERT INTO books (title, author, isbn, publication_year, available_copies) 
    VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [title, author, isbn, publicationYear, availableCopies];

  try {
    const res = await pool.query(query, values);
    console.log('Libro insertado:', res.rows[0]);
    return res.rows[0];  // Opcional: devolver el libro insertado
  } catch (error) {
    console.error('Error al insertar libro:', error);
    throw error;  // Propagar el error para manejarlo en un nivel superior
  }
};


// Función para insertar un libro en favoritos
const insertFavorite = async (userId, bookId) => {
  const query = `
    INSERT INTO favorites (user_id, book_id) 
    VALUES ($1, $2)
  `;
  const values = [userId, bookId];

  try {
    const res = await pool.query(query, values);
    console.log('Favorito insertado:', res.rows[0]);
    return res.rows[0];  // Opcional: devolver el favorito insertado
  } catch (error) {
    console.error('Error al insertar favorito:', error);
    throw error;  // Propagar el error para manejarlo en un nivel superior
  }
};


// Función para insertar un orden
const insertOrder = async (userId, bookId, loanDate, returnDate) => {
  const query = `
    INSERT INTO orders (user_id, book_id, loan_date, return_date) 
    VALUES ($1, $2, $3, $4)
  `;
  const values = [userId, bookId, loanDate, returnDate];

  try {
    const res = await pool.query(query, values);
    console.log('Orden insertada:', res.rows[0]);
    return res.rows[0];  // Opcional: devolver la orden insertada
  } catch (error) {
    console.error('Error al insertar orden:', error);
    throw error;  // Propagar el error para manejarlo en un nivel superior
  }
};

// Funcion para insertar una nueva categoria

const insertBookCategory = async (bookId, categoryId) => {
  const query = `
    INSERT INTO book_categories (book_id, category_id) 
    VALUES ($1, $2)
  `;
  const values = [bookId, categoryId];

  try {
    const res = await pool.query(query, values);
    console.log('Libro-Categoría insertado:', res.rows[0]);
    return res.rows[0];  // Opcional: devolver el registro insertado
  } catch (error) {
    console.error('Error al insertar libro-categoría:', error);
    throw error;  // Propagar el error para manejarlo en un nivel superior
  }
};

// Funcion para registrar la actividad del administrador

const insertActivityLog = async (userId, action) => {
  const query = `
    INSERT INTO activity_log (user_id, action) VALUES
    ($1, $2)
    RETURNING *;
  `;
  const values = [userId, action];

  try {
    const res = await pool.query(query, values);
    console.log('Registro de actividad insertado:', res.rows[0]);
    return res.rows[0];  // Opcional: devolver el registro insertado
  } catch (error) {
    console.error('Error al insertar registro de actividad:', error);
    throw error;  // Propagar el error para manejarlo en un nivel superior
  }
};


// Ejemplos de uso
// const ins = async () => {
//   await insertUser('severo', 'password', 'enrrimarq2000@gmail.com', 'admin');
//   // await insertAuthor('Autor 1', 'Biografía del autor 1');
//   // await insertCategory('Tecnologia');
//   // await insertBook('Libro 1', 1, 1, '2023-01-01', '1234567890123', 'Resumen del libro 1', 'eloquent.jpeg');
//   // await insertFavorite(1, 1);

//   // Cierra la conexión después de insertar los datos
//   await pool.end();
// };

// insertUser('severo', 'password', 'enrrimarq2000@gmail.com', 'admin');

module.exports = {
  insertUser: insertUser,
  insertBook: insertBook,
  insertCategory: insertCategory,
  insertFavorite: insertFavorite,
  insertOrder: insertOrder,
  insertBookCategory: insertBookCategory,
  insertActivityLog: insertActivityLog,
};
