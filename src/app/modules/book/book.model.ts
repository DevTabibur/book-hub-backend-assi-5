import { Schema, model } from 'mongoose'
import { IBook, IBookModel } from './book.interface'

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    publishedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

bookSchema.statics.findByTitle = async function (
  title: string,
): Promise<IBook | null> {
  const book = await this.findOne({ title })
  return book
}

bookSchema.statics.findByAuthor = async function (
  author: string,
): Promise<IBook[] | null> {
  const books = await this.find({ author })
  return books
}

bookSchema.statics.findByGenre = async function (
  genre: string,
): Promise<IBook | null> {
  const book = await this.findOne({ genre })
  return book
}

const bookModel = model<IBook, IBookModel>('Book', bookSchema)

export default bookModel
