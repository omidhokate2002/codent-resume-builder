import app from "./app.js";
import ConnectDB from "./config/DbConfig.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

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
