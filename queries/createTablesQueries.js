const pool = require('../config/database');

const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- Guardar la contraseña hasheada
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createTableAuthors = `
CREATE TABLE IF NOT EXISTS authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    biography TEXT
);
`;

const createTableCategories = `
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
`;

const createTableBooks = `
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    category_id INT NOT NULL,
    publication_date DATE,
    isbn VARCHAR(20) UNIQUE,
    summary TEXT,
    cover_image_filename VARCHAR(255),  -- Almacena el nombre del archivo de la portada
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
`;

const createTableFavorites = `
CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    UNIQUE (user_id, book_id)  -- Asegura que un usuario no pueda marcar el mismo libro como favorito más de una vez
);
`;


const createTables = async () => {
    try {
        await pool.query(createTableUsers);
        console.log('Tabla usuarios creada');
        await pool.query(createTableAuthors);
        console.log('Tabla autores creada');
        await pool.query(createTableCategories);
        console.log('Tabla de categorias creada');
        await pool.query(createTableBooks);
        console.log('Tabla de libros creada');
        await pool.query(createTableFavorites);
        console.log('Tabla de favoritos creada');
    } catch (error) {
        console.log(`Error al crear tablas.`, error);
    } finally {
        pool.end();
    }
};

createTables();
// module.exports = {
//     createTableUsers,
//     createTableAuthors,
//     createTableCategories,
//     createTableBooks,
//     createTableFavorites
// };