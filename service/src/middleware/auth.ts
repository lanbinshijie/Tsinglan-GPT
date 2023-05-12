import { isNotEmptyString } from '../utils/is'

const auth = async (req, res, next) => {
  const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
  const AvailableUser = JSON.parse(process.env.AVAILABLE_USERS)
  if (isNotEmptyString(AUTH_SECRET_KEY)) {
    try {
      const Authorization = req.header('Authorization')
      const TokenUser = Authorization.replace('Bearer ', '').trim()
      if (!Object.prototype.hasOwnProperty.call(AvailableUser, TokenUser) || !Authorization)
        throw new Error('Error: 无访问权限 | No access rights')
      next()
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
  }
  else {
    next()
  }
}

export { auth }
