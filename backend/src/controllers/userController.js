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

    async getUserById(req, res){
        const user = await UserService.getUserById(req.params.id);
        res.status(201).json(user);
    }

    async updateUser(req, res){
        const { id } = req.params;
        const updates = req.body;

        const updatedUser = await UserService.updateUser(id, updates);
        
        if(!updatedUser){
            return res.status(404).json({ error: "User not found!" });
        }

        res.status(200).json(updatedUser);
    }    

    async deleteUser(req, res){
        const id = req.params.id;
        const user = await UserService.getUserById(id);
        user = await UserService.deleteUser(id)
        res.status(200).json(user);
    }

}

export default new UserController;