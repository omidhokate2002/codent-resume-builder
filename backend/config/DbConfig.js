import mongoose from "mongoose";
//Connect Database

const ConnectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("Database Connected", mongoose.connection.host);
    });
  } catch (error) {
    console.log("Mongoose DataBase Config Error", error);
    process.exit(1);
  }
};
export default ConnectDB;
