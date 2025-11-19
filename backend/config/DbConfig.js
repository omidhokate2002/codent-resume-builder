import mongoose from "mongoose";
//Connect Database

const ConnectDB = async () => {
  try {
    // Use the MongoDB Atlas connection string directly since .env is not loading
    const mongoUrl = "mongodb+srv://sunny:45CHLB3qzHj3%4056@cluster0.mjph2vl.mongodb.net/resume-builder?retryWrites=true&w=majority";
    console.log("Connecting to MongoDB Atlas...");
    
    await mongoose.connect(mongoUrl);
    console.log("Database Connected", mongoose.connection.host);
  } catch (error) {
    console.log("Mongoose DataBase Config Error", error);
    console.log("Error details:", error.message);
    
    // Provide helpful error information
    if (error.message.includes("whitelist")) {
      console.log("IP Whitelist Error: Your current IP address is not whitelisted in MongoDB Atlas.");
      console.log("Please add your current IP to the MongoDB Atlas IP whitelist:");
      console.log("1. Go to MongoDB Atlas dashboard");
      console.log("2. Navigate to Network Access");
      console.log("3. Add your current IP address (or 0.0.0.0/0 for all IPs)");
    }
    
    process.exit(1);
  }
};
export default ConnectDB;
