import mongoose from 'mongoose';

let connectDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);

        console.log("Db Conncted Sucessfully");

    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb

