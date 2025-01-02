import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.post('/user', userController.createUser);
router.get('/user', userController.getUser);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

export default router;