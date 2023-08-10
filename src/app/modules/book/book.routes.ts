import { Router } from 'express'
import { BookController } from './book.controller'
import verifyToken from '../../middleware/verifyToken'

const router = Router()

// **get all books**
router.get('/', BookController.getAllBook)

// **create book**
router.post('/', verifyToken, BookController.createBook)

// **get book by id**
router.get('/:bookId', verifyToken, BookController.getBookByID)

// **update a book**
router.patch('/:bookId', verifyToken, BookController.updateBook)

export const BookRoute = router
