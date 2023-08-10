import { Request, Response } from 'express'
import catchAsync from '../../../common/catchAsync'
import { AuthService } from './auth.service'
import { sendSuccessResponse } from '../../../common/sendSuccessResponse'
import httpStatus from 'http-status'

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await AuthService.registerUserService(userData)
  const { accessToken } = user
  res
    .header('Authorization', `Bearer ${accessToken}`)
    .header('Access-Control-Expose-Headers', 'Authorization')
    .json({
      message: 'User Created successfully',
      success: true,
      statusCode: httpStatus.CREATED,
      accessToken: accessToken,
    })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body
  const result = await AuthService.loginUserService(loginData)
  res
    .header('Authorization', `Bearer ${result?.accessToken}`)
    .header('Access-Control-Expose-Headers', 'Authorization')
    .json({
      message: 'User Created successfully',
      success: true,
      statusCode: httpStatus.CREATED,
      accessToken: result?.accessToken,
    })
})

const loggedInUser = catchAsync(async (req: Request, res: Response) => {})

export const AuthController = {
  registerUser,
  loginUser,
  loggedInUser,
}
