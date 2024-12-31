import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  try {
    const connectionInstance = await mongoose.connect(mongoUri);
    console.log(
      `DB Connected. \nDB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Connection Failed..");
    process.exit(1);
  }
};
