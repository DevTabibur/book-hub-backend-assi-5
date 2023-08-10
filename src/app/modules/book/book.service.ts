import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import { IBook } from './book.interface'
import bookModel from './book.model'
import httpStatus from 'http-status'
import { Types } from 'mongoose'

const getSingleBookService = async (bookId: string): Promise<IBook> => {
  if (!Types.ObjectId.isValid(bookId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid book id')
  }
  const data = await bookModel.findById(bookId)
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Books not found')
  }
  return data
}

const getAllBookService = async () => {
  const data = await bookModel.find()
  return data
}

const createBookService = async (bookData: IBook): Promise<IBook> => {
  const isExistBook = await bookModel.findByTitle(bookData.title)
  if (isExistBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book is already exist')
  }
  const data = await (await bookModel.create(bookData)).populate('publishedBy')
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'book creation failed')
  }
  return data
}

const updateBookService = async (
  bookId: string,
  updateData: IBook,
  user: JwtPayload,
): Promise<Partial<IBook>> => {
  // const book = await getBookById
  const data = await bookModel.findByIdAndUpdate({ _id: bookId }, updateData, {
    new: true,
  })
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Books not found')
  }
  return data
}

const deleteBookService = async (bookId: string): Promise<IBook> => {
  const data = await bookModel.findByIdAndDelete(bookId)
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Books not found')
  }
  return data
}

export const BookService = {
  createBookService,
  updateBookService,
  deleteBookService,
  getSingleBookService,
  getAllBookService,
}
