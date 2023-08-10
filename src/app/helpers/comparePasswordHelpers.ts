import bcrypt from 'bcrypt'

export const comparePassword = async (
  givenPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isPasswordMatch = await bcrypt.compare(givenPassword, hashedPassword)
  return isPasswordMatch
}
