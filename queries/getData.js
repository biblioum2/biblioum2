const pool = require('../config/database');

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
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
};

// OBTENER EL USUARIO PARA VALIDAR INICIO

const getUser = async () => {
    const query = `
        SELECT * FROM users
    `;
    try {
        const res = await pool.query(query);
        console.log('El usuario es: ', res.rows[0]);
        return res.rows;
    } catch (error) {
        console.log('Error al consultar usuario', error);
        throw error;
    }

};

module.exports= {
    getBooks,
    getUser
};