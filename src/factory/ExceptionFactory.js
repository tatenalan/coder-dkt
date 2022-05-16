import PermissionsException from '../exceptions/PermissionsException.js'
import ServiceException from "../exceptions/ServiceException.js"
import AuthenticationException from '../exceptions/AuthenticationException.js'
import Exception from '../exceptions/Exception.js'

class ExceptionFactory {

    throwException(error, description, message) {
        if (error == 401)
            return new AuthenticationException(error, description, message)
        if (error == 403)
            return new PermissionsException(error, description, message)
        if (error?.toString().startsWith("5") || error == 404)
            return new ServiceException(error, description, message)
        return new Exception(error, description, message)
    }
}
export default ExceptionFactory