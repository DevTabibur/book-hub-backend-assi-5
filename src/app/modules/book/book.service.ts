import ApiError from '../../../errors/ApiError'
import { IBook } from './book.interface'
import bookModel from './book.model'
import httpStatus from 'http-status'

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
): Promise<Partial<IBook>> => {
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
const getSingleBookService = async (bookId: string): Promise<IBook> => {
  const data = await bookModel.findById(bookId)
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
}
