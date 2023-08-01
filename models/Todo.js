import mongoose from "mongoose";

const Schema = mongoose.Schema;


const TodoSchema = new Schema({
    task:{
        type : String,
        required: true,
        min_length : 5
    },
    completed:{
        type : Boolean,
        default: false
    },
    timestamp:{
        type : String,
        default: Date.now()
    }
})

export const Todo = mongoose.model("todolists", TodoSchema);

