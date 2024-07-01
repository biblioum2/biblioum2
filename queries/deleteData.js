const pool = require('../config/database');

// BORRAR TABLAs

const deleteTableUsers = async () => {
    const query = `
        DROP TABLE users
    `;

    try {
        const res = await pool.query(query);
        return console.log(`Tabla users eliminada`);
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
};

const deleteTableAuthors = async () => {
    const query = `
        DROP TABLE authors
    `;

    try {
        const res = await pool.query(query);
        return console.log(`Tabla authors eliminada`);
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
};
const deleteTableCategories = async () => {
    const query = `
        DROP TABLE categories
    `;

    try {
        const res = await pool.query(query);
        return console.log(`Tabla categorias eliminada`);
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
};
const deleteTableBooks = async () => {
    const query = `
        DROP TABLE books
    `;

    try {
        const res = await pool.query(query);
        return console.log(`Tabla libros eliminada`);
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
};
const deleteTableOrders = async () => {
    const query = `
        DROP TABLE orders
    `;

    try {
        const res = await pool.query(query);
        return console.log(`Tabla orders borrada`);
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
};
const deleteTableFavorites = async () => {
    const query = `
        DROP TABLE favorites
    `;

    try {
        const res = await pool.query(query);
        return console.log(`Tabla favoritos borrada`);
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
};


// deleteTableFavorites();
// deleteTableOrders();
// deleteTableBooks();
// deleteTableCategories();
// deleteTableUsers();

