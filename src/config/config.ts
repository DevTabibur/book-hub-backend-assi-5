import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_string: process.env.DATABASE_STRING,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    accessToken: process.env.ACCESS_TOKEN,
    accessToken_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshToken: process.env.REFRESH_TOKEN,
    refreshToken_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
}
