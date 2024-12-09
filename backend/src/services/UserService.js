import User from "../models/User.js";

class UserService {
    
    getAllUsers = async () => {
        const users = await User.find();
        return users;
    }

    getUserById = async (id) => {
        const user = await User.findById(id);
        return user;
    }

    createUser = async (data) => {
        const newUser = await User.create(data);
        return newUser;
    }

    updateUser = async (id, updates) => {
        const userUpdated = await User.findByIdAndUpdate(
            id, 
            updates, 
            {new: true}
        );
        return userUpdated;
    }

    deleteUser = async (id) => {
        const user = await User.deleteOne({ _id: id});
        return user;
    }
}

export default new UserService;