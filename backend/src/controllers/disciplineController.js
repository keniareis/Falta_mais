import Discipline from "../models/discipline.js";
import disciplineService from "../services/DisciplineService.js"

class DisciplineController{
    async getAllDisciplines(req, res){
        const row = await disciplineService.getAllDisciplines();
        res.json(row);
    }

    async getDisciplineById(req, res){
        const row = await disciplineService.getDisciplineById(req.params.id);
        res.json(row);
    }

    async createDiscipline(req, res) {
        try {
            const { name, total_classes, total_absence, current_absence } = req.body;    
            const discipline = { name, total_classes, total_absence, current_absence };
            const savedDiscipline = await disciplineService.createDiscipline(discipline);
    
            res.status(201).json(savedDiscipline);
        } catch (error) {
            res.status(500).json({ error: "Error to create discipline: " + error.message });
        }
    }
    
    async deleteDiscipline(req, res) {
        const id = req.params.id;
        const idExists = await disciplineService.getDisciplineById(id);
        if(!idExists){
            return res.status(404).json({Erro: 'Id does not exist'});
        }
        const row = await disciplineService.deleteDiscipline(id);
        res.json(row);
    }
}

export default new DisciplineController(); 