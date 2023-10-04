import mongoose from "mongoose";

const database = async () => {

    try{
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log('MongoDB Database')

    }catch(error){
        
        console.log(error)

    }
}
export default database;