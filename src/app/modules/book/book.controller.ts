import { Request, Response } from 'express'
import catchAsync from '../../../common/catchAsync'
import { BookService } from './book.service'
import { sendSuccessResponse } from '../../../common/sendSuccessResponse'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBookService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'book retrieved successfully',
    data: result,
  })
})

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body
  const result = await BookService.createBookService(bookData)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'book created successfully',
    data: result,
  })
})

const getBookByID = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params
  const result = await BookService.getSingleBookService(bookId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Single Book is retrieved',
    data: result,
  })
})

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params
  const updateData = req.body
  const user = req.user
  const result = await BookService.updateBookService(
    bookId,
    updateData,
    user as JwtPayload,
  )
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
  })
})

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params
  const result = await BookService.deleteBookService(bookId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
  })
})

export const BookController = {
  getAllBook,
  createBook,
  updateBook,
  deleteBook,
  getBookByID,
}
