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

    async createDiscipline(req, res){
        const row = await disciplineService.createDiscipline(req.body);
        await row.save();
        res.status(201).json(row);
    }

}

export default new DisciplineController(); 