import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IWishList } from './wishList.interface'
import wishListModel from './wishList.model'
import { Types } from 'mongoose'

const addToWishListService = async (wishListData: IWishList) => {
  const { bookId, userId } = wishListData
  if (!bookId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book is not found')
  }
  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is not found')
  }
  const isExistWishList = await wishListModel.existingWishList(userId)

  let wishList
  if (isExistWishList) {
    wishList = await wishListModel
      .findOneAndUpdate({ userId }, { $push: { bookId } }, { new: true })
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
    wishList = (await wishListModel.create(wishListData)).populate([
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

  if (!wishList)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while adding book to wishlist',
    )

  return wishList
}

const getSpecificWishListOfUserService = async (
  userId: string,
): Promise<IWishList | null> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is not found')
  }

  const result = await wishListModel.findOne({ userId }).populate([
    { path: 'bookId', model: 'Book' },
    { path: 'userId', model: 'User' },
  ])
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist not found')
  return result
}

export const WishListService = {
  addToWishListService,
  getSpecificWishListOfUserService,
}
