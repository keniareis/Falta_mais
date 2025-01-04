import bcrypt from 'bcrypt'
import { loginService } from '../services/AuthService.js';

const login =  async (req, res) =>{
    const { email, password } = req.body;

    try{
        const user = await loginService(email);
        
        if(!user){
            return res.status(404).send({message: "User not found"});
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password); 
        
        if(!passwordIsValid){
            return res.status(400).send({message: "Invalid password"});
        }

        res.send(user);
    }catch(err){
        res.status(500).send(err.message); 
    }
};

export { login };