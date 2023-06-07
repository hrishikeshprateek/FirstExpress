class ResponseEntity {
    get getData() {
        return this.data;
    }

    get getSuccess() {
        return this.success;
    }

    get getMessage() {
        return this.message;
    }

    constructor(data,success, message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }


}
module.exports = ResponseEntity