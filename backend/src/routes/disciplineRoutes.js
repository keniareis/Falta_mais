import { Router } from "express";
import disciplineController from "../controllers/disciplineController.js";

const router = Router();

router.get('/discipline', disciplineController.getAllDisciplines);
router.get('/discipline/:id', disciplineController.getDisciplineById);
router.post('/discipline', disciplineController.createDiscipline);
router.delete('/discipline/:id', disciplineController.deleteDiscipline);

export default router;