import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const createAccessToken = (user) => {
  return jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_KEY, { expiresIn: "1h" });
}

export const createJRTEM = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JRTEM_KEY, { expiresIn: "7d" });
}
