"use strict";

const STATUS_CODE = {
    FORBIDDEN: 403,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
};

const STATUS_MESSAGE = {
    FORBIDDEN: "Forbidden",
    BAD_REQUEST: "Bad Request",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
};

class ErrorResponse extends Error {
    constructor({ code, message, errors }) {
        super(message);
        this.code = code;
        this.errors = errors;
    }
}

class BadRequestError extends ErrorResponse {
    constructor({
        code = STATUS_CODE.BAD_REQUEST,
        message = STATUS_MESSAGE.BAD_REQUEST,
        errors = null
    }) {
        super({ code, message, errors });
    }
}

class ForbiddenError extends ErrorResponse {
    constructor({
        code = STATUS_CODE.FORBIDDEN,
        message = STATUS_MESSAGE.FORBIDDEN,
    }) {
        super({ code, message });
    }
}

class InternalServerError extends ErrorResponse {
    constructor({
        code = STATUS_CODE.INTERNAL_SERVER_ERROR,
        message = STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    }) {
        super({ code, message });
    }
}

module.exports = {
    BadRequestError,
    ForbiddenError,
    InternalServerError,
};
