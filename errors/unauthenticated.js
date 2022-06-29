import CustomAPIError from "./customApi.js";
import { StatusCodes } from 'http-status-codes';

class UnAuthenticatedError extends CustomAPIError {
    constructor(message){
        super(message);
        this.message = message;
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnAuthenticatedError;