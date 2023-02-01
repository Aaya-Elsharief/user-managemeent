import { Schema, model } from "mongoose"

const userSchema = new Schema({
    username : { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true, minlength: 6},
    age: {type: Number, required: true, min: 18, max: 50},
    timestamp:  { type: Date, default: Date.now },
})


const User = model("User", userSchema);

export default User;