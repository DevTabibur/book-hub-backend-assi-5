import { Schema, model } from 'mongoose'
import { IWishList, IWishListModel } from './wishList.interface'

const wishListSchema = new Schema<IWishList>(
  {
    bookId: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

const wishListModel = model<IWishList, IWishListModel>(
  'WishList',
  wishListSchema,
)

export default wishListModel
