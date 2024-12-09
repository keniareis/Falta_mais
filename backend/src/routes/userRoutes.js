import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.post('/user', userController.createUser);
router.get('/user', userController.getUser);
router.get('/user/:id', userController.getUserById);

export default router;