const pool = require('../config/database');


// Función para insertar un usuario
const insertUser = async (username, passwordHash, email, role) => {
  const query = `
    INSERT INTO users (username, password_hash, email, role) VALUES
    ($1, $2, $3, $4)
  `;
  const values = [username, passwordHash, email, role];

  try {
    const res = await pool.query(query, values);
    console.log('Usuario insertado:', res.rows[0]);
  } catch (error) {
    console.error('Error al insertar usuario:', error);
  }
};

// Función para insertar una categoria
const insertCategory = async (name) => {
  const query = `
    INSERT INTO categories (name) VALUES
    ($1)

  `;
  const values = [name];

  try {
    const res = await pool.query(query, values);
    console.log('Categoria insertada:', res.rows[0]);
  } catch (error) {
    console.error('Error al insertar categoria:', error);
  }
};

// Función para insertar un libro
const insertBook = async (title, edition, author, categoryId, publicationDate, isbn, summary, available, image ) => {
  const query = `
    INSERT INTO books (title, edition, author, category_id, publication_date, isbn, summary, available, cover_image_filename) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)

  `;
  const values = [title, edition, author, categoryId, publicationDate, isbn, summary, available, image];

  try {
    const res = await pool.query(query, values);
    console.log('Libro ingresado:', res.rows[0]);
  } catch (error) {
    console.error('Error al ingresar libro:', error);
  }
};

// Función para insertar un libro en favoritos
const insertFavorite = async (userId, bookId) => {
  const query = `    
    INSERT INTO favorites (user_id, book_id) VALUES
    ($1, $2)

  `;
  const values = [userId, bookId];

  try {
    const res = await pool.query(query, values);
    console.log('Libro Agregado a favoritos:', res.rows[0]);
  } catch (error) {
    console.error('Error al insertar libro en favoritos:', error);
  }
};

// Función para insertar un orden
const insertOrder = async (userId, bookId, status) => {
  const query = `
    INSERT INTO orders (user_id, book_id, status) VALUES
    ($1, $2, $3)

  `;
  const values = [userId, bookId, status];

  try {
    const res = await pool.query(query, values);
    console.log('Orden agregada:', res.rows[0]);
  } catch (error) {
    console.error('Error al agregar orden:', error);
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
};
