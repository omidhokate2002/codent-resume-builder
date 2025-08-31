import app from "./app.js";
import ConnectDB from "./config/DbConfig.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Set default values for environment variables
process.env.PORT = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Debug environment variables
console.log('Environment variables after dotenv.config():');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URL:', process.env.MONGO_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

const port = process.env.PORT || 5000;

await ConnectDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("DataBase Connect Error", error);
    process.exit(1);
  });
