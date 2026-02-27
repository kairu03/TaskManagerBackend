// Global Error Handling Middleware
// This middleware catches all errors passed using next(err)
// It must be placed last in app.js after all routes

export const errorHandler = (err, req, res, next) => {
  // Determine the HTTP status code:
  const statusCode = err.statusCode || res.statusCode || 500;
  // Set the HTTP response status
  res.status(statusCode).json({ 
    //  helps frontend easily detect failed requests 
    success: false,
    // Send error message (either custom or fallback message)
    message: err.message || 'Server Error',
    // Show stack trace ONLY in development for debugging
    // Hide it in production for security reasons
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

