import { Model, Types } from 'mongoose'

export interface IReadingList {
  bookId: Types.ObjectId[]
  userId: Types.ObjectId
}

export interface IReadingListModel extends Model<IReadingList> {
  existingReadingList(userId: Types.ObjectId): Promise<IReadingList | null>
}
