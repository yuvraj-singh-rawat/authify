import mongoose from "mongoose";

const connectDB = async (req, res) => {

    mongoose.connection.on('Connected', () => {
        console.log("Database Connected")
    })

    await mongoose.connect(`${process.env.MONGO_URI}/authify`)
};

export default connectDB;