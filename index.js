import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import { Todo } from "./models/Todo.js";
// import dotenv from "dotenv";
const app = express();
// dotenv.config();
import "./db/connection.js";
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to TodoList</h1>");
});
// const Db = process.env.MongoDbUrl;

// mongoose
//   .connect(Db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connected to the database");
//   })
//   .catch((err) => {
//     console.log("something went wrong: " + err);
//   });

// (async function (){
//    await connection.js();
// })
// mongoose
//   .connect(`${process.env.MongoDbUrl}/mern-todo`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connected to data base");
//   })
//   .catch((err) => {
//     console.log("something went wrong: " + err);
//   });


app.get('/todos' ,async (req, res) => {
    try{
   const data = await Todo.find();
   return res.status(200).json(data);
}catch(err){
    return res.status(404).json("something went wrong: " + err);
}
})

app.post('/todo/new', async (req, res) =>{
    const todo = new Todo({
        task : req.body.text,
    })
    try{
        const data = await todo.save();
        return res.status(200).json("added");
    }catch(err){
       return res.status(500).json(err.message);
    }
})

app.delete("/todo/delete/:id",async (req,res)=>{
    try{
    console.log(req.params.id);
    const deleteTask = await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).json("deleted successfully");
    }catch(err){
    return res.status(500).json(err.message);
    }
})

app.put("/todo/complete/:id", async (req, res)=>{
    try{
        const getTask = await Todo.findById(req.params.id);

        if(!getTask)return res.status(404).json("task not found");
        //update that Task
        getTask.completed = !getTask.completed;

        const updatedTask = await getTask.save();
        return res.status(200).json("task updated successfully");
    }catch(err){
        return res.status(500).json(err.message);
    }
})
app.listen(5500, () => {
  console.log("port is running on posrt no 5500");
});
