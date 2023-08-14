import { Router } from 'express'
import { BookController } from './book.controller'
import verifyToken from '../../middleware/verifyToken'

const router = Router()

// **get all books**
router.get('/', BookController.getAllBook)

// **create book**
router.post('/', verifyToken, BookController.createBook)

// **get book by id**
router.get('/:bookId', BookController.getBookByID)

// **update a book**
router.patch('/:bookId', verifyToken, BookController.updateBook)

// **delete book**
router.delete('/:bookId', verifyToken, BookController.deleteBook)

export const BookRoute = router
