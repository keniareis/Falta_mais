import UserService from "../services/UserService.js";

class UserController {

    async createUser(req, res){
        const { name, email, password} = req.body;
        const user = { name, email, password};

        try {
            const savedUser = await UserService.createUser(user);
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ error: "Error to create user: " + error.message });
        }
    }

    async getUser(req, res){
        try {
            const users = await UserService.getAllUsers();
            res.json(users);    
        } catch (error) {
            res.status(500).json({ error: "Error fetching users: " + error.message });
        }
    }

    async getUserById(req, res){
        try {
            const user = await UserService.getUserById(req.params.id);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Error fetching user: " + error.message });
        }
    }

    async updateUser(req, res){
        const { id } = req.params;
        const updates = req.body;
        try {
            const updatedUser = await UserService.updateUser(id, updates);
            
            if(!updatedUser){
                return res.status(404).json({ error: "User not found!" });
            }
    
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: "Error updating user: " + error.message });
        }
    }    

    async deleteUser(req, res){
        const id = req.params.id;
        try {
            const user = await UserService.getUserById(id);
            if(!user){
                return res.status(404).json({ error: "User not found!" });
            }
            user = await UserService.deleteUser(id)
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Error deleting user: " + error.message });
        }
    }

}

export default new UserController;