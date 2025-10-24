import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avtar: {
        type: String,
        default: "https://imgs.search.brave.com/ltAYwVjkM5KcFChpAotaPbvyfi5GBt9zbMGfs6LX6Vw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zbWFs/bGltZy5wbmdrZXku/Y29tL3BuZy9zbWFs/bC8xMTQtMTE0OTg0/N19hdmF0YXItdW5r/bm93bi1kcC5wbmc"
    }
});

export default mongoose.model("User", userSchema)