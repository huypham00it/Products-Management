import CustomAPIError from "./customApi.js";
import { StatusCodes } from 'http-status-codes';

class NotFoundError extends CustomAPIError {
    constructor(message){
        super(message);
        this.message = message;
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;