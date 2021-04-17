const jwt = require('jsonwebtoken');
import 'dotenv/config'

export const createAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: "2h" });
}

export const createJRTEM = (user) => {
  return jwt.sign({ userId: user.id, tokenVersion: user.token_version }, process.env.JRTEM_KEY, { expiresIn: "7d" });
}

export const sendRefreshToken = (req, res, token) => {
  res.cookie('jrtem', token,
  {
    httpOnly: true,
    secure: req.app.get('env') != 'development',
    signed: false // need env secret to make true. not working when I do so.
  });
}
