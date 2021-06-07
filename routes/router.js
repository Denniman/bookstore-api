import express from 'express'
import { addBook, getBooksController, updateBookController, deleteBook } from '../controllers/bookController.js'
import{ registerController, loginController, verify } from '../controllers/userController.js'

const router = express.Router()

// router.route('/register')
// .post(registerController)

router.route('/')
.post(loginController)


router.route('/add')
.post(verify, addBook)

router.route('/update/:bookId')
.put(verify, updateBookController)

router.route('/delete/:bookId')
.delete(verify, deleteBook)


export default router