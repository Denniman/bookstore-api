import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Client } = pg

const client = new Client(
    {
        user: process.env.DATABASE_USER,
        host: 'localhost',
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: 5432
    }
)

client.on('connect', () => console.log('Database connected!'))

client.on('error', (err) => console.log(`Something went wrong ${err}`))

export default client