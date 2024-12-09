import UserService from "../services/UserService.js";

class UserController {

    async createUser(req, res){
        const { name, email, password} = req.body;
        const user = { name, email, password};
        const savedUser = await UserService.createUser(user);
        res.status(201).json(savedUser);
    }

    async getUser(req, res){
        const users = await UserService.getAllUsers();
        res.json(users);
    }
    
}

export default new UserController;