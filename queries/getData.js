const pool = require('../config/database');

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

const getUser = async (username) => {
    const query = `
        SELECT * FROM users WHERE username = $1
    `;
    try {
        const res = await pool.query(query, [username]);
        console.log('El usuario es: ', res);
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