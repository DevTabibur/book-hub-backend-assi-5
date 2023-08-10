import bcrypt from 'bcrypt'
import userModel from '../modules/user/user.model'

export const comparePassword = async (
  email: string,
  givenPassword: string,
): Promise<boolean> => {
  const user = await userModel.isUserExist(email)
  if (!user || !user.password) {
    return false
  }
  const isPasswordMatch = await bcrypt.compare(
    givenPassword,
    user.password as string,
  )
  return isPasswordMatch
}
