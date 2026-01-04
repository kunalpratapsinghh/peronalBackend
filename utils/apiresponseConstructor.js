class ApiResponse {
  constructor(data, message = "Success", success = true, status = 200) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = success;
  }
}

export default ApiResponse;
