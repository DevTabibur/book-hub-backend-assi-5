import { Model } from 'mongoose'

export interface IUser {
  _id: string
  name: {
    firstName: string
    lastName: string
  }
  email: string
  password: string
}

export interface IUserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>
}
