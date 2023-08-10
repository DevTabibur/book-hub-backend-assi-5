import { Request, Response } from 'express'
import catchAsync from '../../../common/catchAsync'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import userModel from '../user/user.model'
import { WishListService } from './wishList.service'
import { sendSuccessResponse } from '../../../common/sendSuccessResponse'

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const wishListData = req.body
  const user = req.user

  const isUserExist = await userModel.isUserExist(user?.email)
  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')
  }
  wishListData.userId = isUserExist._id
  const result = await WishListService.addToWishListService(wishListData)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book added to wishlist successfully',
    data: result,
  })
})

const getSpecificWishListOfUser = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found')
    }

    const isUserExist = await userModel.isUserExist(user?.email)

    if (!isUserExist) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found')
    }

    const result = await WishListService.getSpecificWishListOfUserService(
      isUserExist?._id as string,
    )

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: 'WishList retrieved successfully',
      data: result,
    })
  },
)

export const WishListController = {
  getSpecificWishListOfUser,
  addToWishList,
}
