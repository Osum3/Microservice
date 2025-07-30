const  mongoose=require("mongoose")
const dotenv=require('dotenv')
dotenv.config();


const connectDB = async () => {
  try {
    const ap=await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
  } catch (err) {
    console.log("Failed to connect with DB");
    console.error(err.message);
  }
};

module.exports = connectDB;
