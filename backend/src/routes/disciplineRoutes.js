import { Router } from "express";
import disciplineController from "../controllers/disciplineController.js";

const router = Router();

router.get('/discipline', disciplineController.getAllDisciplines);

export default router;