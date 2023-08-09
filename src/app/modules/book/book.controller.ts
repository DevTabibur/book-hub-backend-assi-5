import { Request, Response } from 'express'
import catchAsync from '../../../common/catchAsync'
import { BookService } from './book.service'
import { sendSuccessResponse } from '../../../common/sendSuccessResponse'
import httpStatus from 'http-status'
const getAllBook = catchAsync(async (req: Request, res: Response) => {
  console.log('hitted')
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

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params
  const updateData = req.body
  const result = await BookService.updateBookService(bookId, updateData)
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

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params
  const result = await BookService.getSingleBookService(bookId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'single book retrieved successfully',
    data: result,
  })
})

export const BookController = {
  getAllBook,
  createBook,
  updateBook,
  deleteBook,
  getSingleBook,
}
