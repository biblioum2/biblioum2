const pool = require('../config/database');


// Función para insertar un usuario
const insertUser = async (username, passwordHash, email) => {
  const query = `
    INSERT INTO users (username, password_hash, email)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [username, passwordHash, email];

  try {
    const res = await pool.query(query, values);
    console.log('Usuario insertado:', res.rows[0]);
  } catch (error) {
    console.error('Error al insertar usuario:', error);
  }
};

// Función para insertar un autor
const insertAuthor = async (name, biography) => {
  const query = `
    INSERT INTO authors (name, biography)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [name, biography];

  try {
    const res = await pool.query(query, values);
    console.log('Autor insertado:', res.rows[0]);
  } catch (error) {
    console.error('Error al insertar autor:', error);
  }
};

// Función para insertar una categoría
const insertCategory = async (name) => {
  const query = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING *;
  `;
  const values = [name];

  try {
    const res = await pool.query(query, values);
    console.log('Categoría insertada:', res.rows[0]);
  } catch (error) {
    console.error('Error al insertar categoría:', error);
  }
};

// Función para insertar un libro
const insertBook = async (title, authorId, categoryId, publicationDate, isbn, summary, coverImageFilename) => {
  const query = `
    INSERT INTO books (title, author_id, category_id, publication_date, isbn, summary, cover_image_filename)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [title, authorId, categoryId, publicationDate, isbn, summary, coverImageFilename];

  try {
    const res = await pool.query(query, values);
    console.log('Libro insertado:', res.rows[0]);
  } catch (error) {
    console.error('Error al insertar libro:', error);
  }
};

// Función para insertar un favorito
const insertFavorite = async (userId, bookId) => {
  const query = `
    INSERT INTO favorites (user_id, book_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [userId, bookId];

  try {
    const res = await pool.query(query, values);
    console.log('Favorito insertado:', res.rows[0]);
  } catch (error) {
    console.error('Error al insertar favorito:', error);
  }
};

// Ejemplos de uso
(async () => {
  await insertUser('admin', 'password', 'biblioacc117umte@gmail.com');
  await insertAuthor('Autor 1', 'Biografía del autor 1');
  await insertCategory('Tecnologia');
  await insertBook('Libro 1', 1, 1, '2023-01-01', '1234567890123', 'Resumen del libro 1', 'eloquent.jpeg');
  await insertFavorite(1, 1);

  // Cierra la conexión después de insertar los datos
  await pool.end();
})();
