import { IUser } from '../user/user.interface'

export interface IUserResponse {
  accessToken: string
  data: Partial<IUser>
}

// For jwt payload-------------
export interface IJwtPayload {
  email: string
}
