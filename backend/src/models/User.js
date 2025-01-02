import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true,
        minlength: 6
    },
    
    password: { 
        type: String, 
        required: true,
        select: false
    }
});

UserSchema.pre('save', async function (next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;