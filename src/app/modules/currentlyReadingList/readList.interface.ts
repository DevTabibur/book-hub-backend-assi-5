import { Types } from 'mongoose'

export interface IReadingList {
  bookId: Types.ObjectId[]
  userId: Types.ObjectId
}
