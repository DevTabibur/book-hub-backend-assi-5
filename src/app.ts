import express, { Application } from 'express'
import cors from 'cors'
import dbConnect from './app/utils/dbConnect'

const app: Application = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// database connection
dbConnect()

// testing route
app.get('/', async (req, res) => {
  res.send('This is a book hub backend')
})

export default app
