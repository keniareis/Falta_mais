import mongoose from 'mongoose';

const connectDb = async () => {
    console.log("Wait connecting to the database");
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connect!');
    }catch(error){
        console.error('Error :', error);
        process.exit(1);
    }
}

export default connectDb;
