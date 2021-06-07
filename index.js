import express from 'express'
import cors from 'cors'
import router from './routes/router.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { registerController, verify } from './controllers/userController.js'
import { getBooksController } from './controllers/bookController.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())

app.use(express.urlencoded({ extended: true }))

const db = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.t3hjt.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`

mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('connected successfully'))
.catch((err) => console.log(err))


app.use('/login', router)

app.get('/', getBooksController)

app.post('/register', registerController)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})