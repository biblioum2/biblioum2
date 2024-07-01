const pool = require('../config/database');

const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- Guardar la contraseña hasheada
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createTableCategories = `
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
`;

const createTableBooks = `
CREATE TABLE IF NOT EXISTS books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(135) NOT NULL,
    edition VARCHAR(10) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    publication_date DATE,
    isbn VARCHAR(40) UNIQUE,
    summary VARCHAR(400),
    available VARCHAR(15),
    cover_image_filename VARCHAR(60),  -- Almacena el nombre del archivo de la portada
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
`;

const createTableFavorites = `
CREATE TABLE IF NOT EXISTS favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    UNIQUE (user_id, book_id)  -- Asegura que un usuario no pueda marcar el mismo libro como favorito más de una vez
);
`;

const createTableOrders = `
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP,
    status VARCHAR(20) NOT NULL,  -- Puede ser 'En espera', 'Prestado', 'Devuelto'
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);
`;



const createTables = async () => {
    try {
        await pool.query(createTableUsers);
        console.log('Tabla usuarios creada');
        await pool.query(createTableCategories);
        console.log('Tabla de categorias creada');
        await pool.query(createTableBooks);
        console.log('Tabla de libros creada');
        await pool.query(createTableFavorites);
        console.log('Tabla de favoritos creada');
        await pool.query(createTableOrders);
        console.log('Tabla de ordenes creada');
    } catch (error) {
        console.log(`Error al crear tablas.`, error);
    } finally {
        pool.end();
    }
};

// createTables();
// module.exports = {
//     createTableUsers,
//     createTableCategories,
//     createTableBooks,
//     createTableFavorites
// };