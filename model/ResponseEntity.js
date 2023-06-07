class ResponseEntity {
    get data() {
        return this._data;
    }

    get success() {
        return this._success;
    }

    get message() {
        return this._message;
    }

    constructor(data,success, message) {
        this._data = data;
        this._success = success;
        this._message = message;
    }


}
module.exports = ResponseEntity