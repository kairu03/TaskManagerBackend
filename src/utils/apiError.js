
// Custom error class for API errors
// Extends the built-in Error class
export class ApiError extends Error {
  constructor(message, statusCode) {
    // Call the parent Error constructor with the message
    super(message);

    // Store HTTP status code
    this.statusCode = statusCode; 
    
    // Set error name as class name
    this.name = this.constructor.name; 

    // Capture stack trace for debugging
    Error.captureStackTrace(this, this.constructor); 
  }
}
