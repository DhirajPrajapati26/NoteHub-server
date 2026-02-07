import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => {
      console.log(`Database connected successfully`);
    })
    .catch((err) => console.log("Error connecting database"))
    .finally(()=>{
        console.log("DB Process completed")
    })
};
export default connectDB;
