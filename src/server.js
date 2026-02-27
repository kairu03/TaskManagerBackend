import { connectDB } from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

// DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server started on PORT: ', PORT);
  });
});
