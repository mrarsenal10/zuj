"use strict";

const STATUS_CODE = {
    OK: 200,
};

const STATUS_MESSAGE = {
    OK: "Success",
};

class SuccessResponse {
    constructor({ message, code, metadata }) {
        this.message = message;
        this.code = code;
        this.metadata = metadata;
    }

    send(res) {
        return res.status(this.code).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({
        message = STATUS_MESSAGE.OK,
        code = STATUS_CODE.OK,
        metadata,
    }) {
        super({ message, code, metadata });
    }
}

module.exports = {
    OK,
};
