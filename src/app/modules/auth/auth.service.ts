import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from '../user/user.interface'
import userModel from '../user/user.model'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../../config/config'
import bcrypt from 'bcrypt'
import hashedPassword from '../../helpers/hashedPasswordHelpers'

const registerUserService = async (userData: IUser) => {
  const { password, ...rest } = userData
  const { email } = userData

  // check user is already there or not
  const isUserExist = await userModel.isUserExist(email)
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist')
  }

  // give user accessToken
  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.accessToken as string,
    config.jwt.accessToken_expires_in as string,
  )

  // Store hash in your password DB.
  const hashed = await hashedPassword(password)

  const user = await userModel.create({
    password: hashed,
    ...rest,
  })
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User creation unsuccessful')
  }
  return { accessToken, data: user }
}

export const AuthService = {
  registerUserService,
}
