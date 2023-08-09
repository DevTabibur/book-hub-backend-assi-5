import { Router } from 'express'
import { BookController } from './book.controller'

const router = Router()

// **get all books**
router.get('/', BookController.getAllBook)

// **create book**
router.post('/', BookController.createBook)
export const BookRoute = router
