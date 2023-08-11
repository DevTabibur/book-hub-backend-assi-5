import { IReadingList } from './readList.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import readingListModel from './readList.model'
import { Types } from 'mongoose'

const addToReadingListService = async (
  readingData: IReadingList,
): Promise<IReadingList> => {
  const { bookId, userId } = readingData
  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user is not found')
  }
  if (!bookId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'book is not found')
  }

  // checking that user already have a reading list or not?
  const isExistReadingList = await readingListModel.existingReadingList(userId)

  console.log('isExistReadingList', isExistReadingList)
  let readingList

  // if existing reading list is true, then just update it, if not, then create it
  if (isExistReadingList) {
    readingList = await readingListModel
      .findOneAndUpdate({ _id: userId }, { $push: { bookId } }, { new: true })
      .populate([
        {
          path: 'bookId',
          model: 'Book',
        },
        {
          path: 'userId',
          model: 'User',
        },
      ])
  } else {
    readingList = (await readingListModel.create(readingData)).populate([
      {
        path: 'bookId',
        model: 'Book',
      },
      {
        path: 'userId',
        model: 'User',
      },
    ])
  }

  if (!readingList)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while adding book to reading list',
    )

  return readingList
}

const getSpecificUserReadingListService = async (
  userId: string,
): Promise<IReadingList | null> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is not found')
  }

  const result = await readingListModel.findOne({ userId }).populate([
    { path: 'bookId', model: 'Book' },
    { path: 'userId', model: 'User' },
  ])
  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, 'reading list not found')
  return result
}

export const ReadingListService = {
  addToReadingListService,
  getSpecificUserReadingListService,
}
