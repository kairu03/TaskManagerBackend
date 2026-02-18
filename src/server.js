import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import mongoSanitize from '@exortek/express-mongo-sanitize';
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express'

import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { ApiError } from "./utils/apiError.js";
import { authLimiter, globalLimiter } from "./config/rateLimiter.js";
import { corsOptions } from "./config/cors.js";
import { logger } from "./config/logger.js";
import { swaggerSpec } from "./config/swagger.js";

// SETUP
// load environment variables
dotenv.config();
// create server 
const app = express();
// PORT setup
const PORT = process.env.PORT || 5000;

// SECURITY LAYER
// Hide X-Powered-By header to prevent exposing Express info
app.disable('x-powered-by');
// security middleware
app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  app.use(cors()); // allow all for backend-only
} else {
  app.use(cors(corsOptions)); // dev restrictions
}

// JSON body parser
app.use(express.json());


// HTTP request logging (w/ Morgan)
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// to sanitize all incoming requests
app.use(mongoSanitize({ replaceWith: '_' })); // sanitized req.body, req.query, req.params

// Enable trusting proxy headers for proper IP tracking (required for rate limiting)
app.set('trust proxy', 1);

// Global limiter (applies to all routes below)
app.use(globalLimiter);

// tester for route
app.get('/', (req, res) => {
  res.send('Task manager api is running');
});

// API route prefixes
// Apply stricter limiter ONLY to auth routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404);
  next(new ApiError(`Not Found - ${req.originalUrl}`, 404));
});

// global error handler
app.use(errorHandler);

// DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server started on PORT: ', PORT);
  });
});



// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();



//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODQ4MDBiZmUyMmRkODc5Y2I5NjY4YSIsImlhdCI6MTc3MDM3ODA3MywiZXhwIjoxNzcwOTgyODczfQ.SEnQEI7FMx93K0LFCH1briEN2jsWhE5W_Z3pjsgb0Bc"