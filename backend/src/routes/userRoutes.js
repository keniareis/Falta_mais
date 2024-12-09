import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.post('/user', userController.createUser);
router.get('/user', userController.getUser);

export default router;