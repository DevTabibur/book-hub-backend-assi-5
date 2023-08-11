import { Request, Response } from 'express'
import catchAsync from '../../../common/catchAsync'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import userModel from '../user/user.model'
import { sendSuccessResponse } from '../../../common/sendSuccessResponse'
import { ReadingListService } from './readList.service'

const addToReadingList = catchAsync(async (req: Request, res: Response) => {
  const readingData = req.body
  const user = req.user
  // checking if user is valid or not
  const isUserExist = await userModel.isUserExist(user?.email)
  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized user')
  }

  readingData.userId = isUserExist._id
  const result = await ReadingListService.addToReadingListService(readingData)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'added reading list successfully',
    data: result,
  })
})

const getSpecificUserReadingList = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found')
    }

    const isUserExist = await userModel.isUserExist(user?.email)
    if (!isUserExist) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found')
    }

    const result = await ReadingListService.getSpecificUserReadingListService(
      isUserExist?._id as string,
    )
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: 'successfully retrieved',
      data: result,
    })
  },
)

export const ReadingListController = {
  addToReadingList,
  getSpecificUserReadingList,
}
