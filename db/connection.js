import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const Db = process.env.MongoDbUrl;
//console.log(Db);
mongoose.connect(`${Db}`,{
    useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(()=>{
    console.log("database connection established")
}).catch(err=>console.log("Error Occured " + err));