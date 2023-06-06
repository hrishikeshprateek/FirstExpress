class ResponseEntity {
    constructor(data,success, message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }
}
module.exports = ResponseEntity