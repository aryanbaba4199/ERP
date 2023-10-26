// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
        "mongodb+srv://aryanbaba4199:Aryan7277@erp.ao3scwu.mongodb.net/?retryWrites=true&w=majority", 
        {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Connected to Database : `);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
};

export default connectDB;
