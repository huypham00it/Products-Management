import {UnAuthenticatedError} from '../errors/index.js';

const checkPermission = (requestUser, resourceId) => {
    if(requestUser.userId === resourceId.toString()) return;
    throw new UnAuthenticatedError('Not authorized to access this route')
}

export default checkPermission;