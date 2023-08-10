import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

const regenerateToken = async (
  refreshToken: string,
  accessSecret: Secret,
  refreshSecret: Secret,
  accessExpiresIn: string,
) => {
  const { _id, role } = await verifyToken(refreshToken, refreshSecret)
  const newToken = createToken({ _id, role }, accessSecret, accessExpiresIn)
  return newToken
}

export const jwtHelpers = {
  createToken,
  verifyToken,
  regenerateToken,
}
