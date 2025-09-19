import mongoose from 'mongoose';

const connextDB = async ()=>{
   try {
     const connect = await mongoose.connect(process.env.MONGODB_URL);
     console.log("Mongodb Connected ");
   } catch (error) {
        console.error(error, "Database Connection Error");
        
   }
    
}

export default connextDB;
