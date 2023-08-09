import express, { Application } from 'express'
import cors from 'cors'
import dbConnect from './app/utils/dbConnect'
import httpStatus from 'http-status'
import router from './app/Routes/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { sendSuccessResponse } from './common/sendSuccessResponse'

const app: Application = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// database connection
dbConnect()

// testing route
app.get('/', async (req, res) => {
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book Hub API is worked',
  })
})

// all routes
app.use('/api/v1', router)

// handle global error handler
app.use(globalErrorHandler)

// no found routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('*', (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: 'false',
    message: `NO API is found. Try another API`,
    errorMessages: [
      {
        message: `NO API is found for ${req.method} Method ${req.originalUrl}`,
        path: req.originalUrl,
      },
    ],
    stack: '',
  })
})

export default app
