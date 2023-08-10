import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from '../user/user.interface'
import userModel from '../user/user.model'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../../config/config'
import bcrypt from 'bcrypt'
import hashedPassword from '../../helpers/hashedPasswordHelpers'
import { comparePassword } from '../../helpers/comparePasswordHelpers'
import { IUserResponse } from './auth.interface'

const registerUserService = async (userData: IUser): Promise<IUserResponse> => {
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

const loginUserService = async (loginData: IUser): Promise<IUserResponse> => {
  const { email, password: givenPassword } = loginData

  const isUserExist = await userModel.findOne({ email }).select('+password')
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is not found')
  }

  const isPasswordMatch = await comparePassword(
    givenPassword,
    isUserExist.password,
  )

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Inavlid Password')
  }

  // give user accessToken
  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.accessToken as string,
    config.jwt.accessToken_expires_in as string,
  )

  return { accessToken, data: { email: isUserExist.email } }
}

export const AuthService = {
  registerUserService,
  loginUserService,
}
