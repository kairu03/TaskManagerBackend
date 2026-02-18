// Global Error Handling Middleware
// This middleware catches all errors passed using next(err)
// It must be placed LAST in app.js after all routes

// export const errorHandler = (err, req, res, next) => {

//   // Determine the HTTP status code:
//   // 1. Use custom error statusCode if available (from ApiError)
//   // 2. Otherwise use the current response statusCode
//   // 3. Default to 500 (Internal Server Error)
//   const statusCode = err.statusCode || res.statusCode || 500;

//   // Set the HTTP response status
//   res.status(statusCode).json({ 

//     // Optional: helps frontend easily detect failed requests 
//     success: false,

//     // Send error message (either custom or fallback message)
//     message: err.message || 'Server Error',

//     // Show stack trace ONLY in development for debugging
//     // Hide it in production for security reasons
//     stack: process.env.NODE_ENV === 'development' ? err.stack : null,
//   });
// };


export const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || res.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })
}
