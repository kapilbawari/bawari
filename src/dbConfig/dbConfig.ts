import mongoose from 'mongoose';

export async function connectToMongoDB() {
    try {

        await mongoose.connect(process.env.MONGO_URL!)
        const mongongoose = mongoose.connection
        mongongoose.on("connection",()=>{
            console.log('MongoDB connected successfully');
        })
        mongongoose.on("error",(error)=>{
            console.log('MongoDB connected  not successfully' + error);
            process.exit()
        })

      
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Optionally rethrow the error
    }
}
