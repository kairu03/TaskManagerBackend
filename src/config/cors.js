
const allowedOrigins = [
  'http://localhost:5000', // backend / Swagger
  'http://localhost:3000', // frontend React dev server
];


export const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or Swagger)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: ${origin} not allowed`));
    }
  },
  credentials: true, // allow cookies, auth headers
};
