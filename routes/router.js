import express from 'express'
import client  from '../db/index.js'

const router = express.Router()
// get all books
router.route('/books')
.get(async (req, res) => {
    try {
        const getBooks = await client.query(`SELECT * FROM book`)
        res.send({message: 'Successful', data: getBooks.rows})
    } catch (err) {
        console.log(err.message)
    }
})
// add books
.post(async (req, res) => {
    const { title, author, published_year } = req.body
    try {
        const addBooks = await client.query(
            `INSERT INTO book (title, author, published_year) VALUES ($1, $2, $3) RETURNING *`,
            [title, author, published_year])
            res.send({message: 'Book added successfully!', data: addBooks.rows[0]})
    } catch (err) {
        console.log(err.message)
    }
    
})

// edit a book
router.route('/books/:bookid')
.patch(async (req, res) => {
    const { bookid } = req.params
    const { title, author, published_year } = req.body
    try {
        await client.query(`UPDATE book SET title = $1, author = $2, published_year = $3 WHERE id = $4`,
        [title, author, published_year, bookid])
    } catch (err) {
        console.log(err)
    }
})
// delete a book
.delete(async (req, res) => {
    const { bookid } = req.params
    try {
        await client.query(`DELETE FROM book WHERE id = $1`, [bookid])
        res.json({message: 'Book deleted successfully'})
    } catch (err) {
        console.log(err);
    }
})



export default router