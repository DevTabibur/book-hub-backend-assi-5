import { Schema, model } from 'mongoose'
import { IReadingList, IReadingListModel } from './readList.interface'

const readingListSchema = new Schema<IReadingList>(
  {
    bookId: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

readingListSchema.statics.existingReadingList = async function (
  userId: string,
): Promise<IReadingList | null> {
  const user = this.findOne({ userId })
  return user
}

const readingListModel = model<IReadingList, IReadingListModel>(
  'ReadList',
  readingListSchema,
)
export default readingListModel
