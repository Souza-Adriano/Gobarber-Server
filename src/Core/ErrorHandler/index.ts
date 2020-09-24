enum httpStatus {
    Success = 200,
    SuccessNoContent = 204,
    BadRequest = 400,
    InternalServerError = 500,
    Forbiden = 403,
    Unauthorized = 401
}

export default class HttpError extends Error {
    constructor(message: string, code: httpStatus) {
        super(message);
    }
}