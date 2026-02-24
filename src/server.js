import { connectDB } from "./config/db.js";
import app from "./app.js";


const PORT = process.env.PORT || 5000;

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