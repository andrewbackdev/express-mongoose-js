const { decodeJwt } = require('@root/api/auth/auth.utils')
const { BadRequestException } = require('@root/app/exceptions')

module.exports = async (req, res, next) => {
  const token = req.headers?.authorization

  if (!token) {
    const error = new BadRequestException({ msg: 'Auth is required' })
    next(error)
    return
  }

  try {
    const jwtToken = token.split(' ')[1]
    const user = decodeJwt(jwtToken)

    req.state = {
      user,
    }
    next()
  } catch (err) {
    next(err)
  }
}
