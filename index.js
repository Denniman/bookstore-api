import express from 'express'
import cors from 'cors'
import router from './routes/router.js'
import client from './db/index.js'


const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

client.connect()
app.use('/', router)

app.get('/', (req, res) => {
    res.send('Welcome to the bookstore api')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})