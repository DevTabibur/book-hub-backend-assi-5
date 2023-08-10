import bcrypt from 'bcrypt'

const hashedPassword = async (password: string): Promise<string> => {
  const salt = 12
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}

export default hashedPassword
