import { Schema, model } from 'mongoose'
import { IReadingList } from './readList.interface'

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

const readingListModel = model<IReadingList>('ReadList', readingListSchema)
export default readingListModel
