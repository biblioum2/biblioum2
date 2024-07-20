const pool = require('../config/database');


// FUNCION PARA CREAR USUARIO
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
// INSERTAR UN LIBRO

async function insertBook(title, author, isbn, publication_year, available_copies) {
  const query = `
      INSERT INTO books (title, author, isbn, publication_year, available_copies)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
  `;
  const values = [title, author, isbn, publication_year, available_copies];
  try {
      const res = await pool.query(query, values);
      return res.rows[0];
  } catch (err) {
      console.error('Error creating book', err);
  }
}


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
  // insertCategory: insertCategory,
  // insertFavorite: insertFavorite,
  // insertOrder: insertOrder,
  // insertBookCategory: insertBookCategory,
  // insertActivityLog: insertActivityLog,
};
