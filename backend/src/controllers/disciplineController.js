import disciplineService from "../services/DisciplineService.js"

class DisciplineController{
    async getAllDisciplines(req, res){
        const row = await disciplineService.getAllDisciplines();
        res.json(row);
    }

}

export default new DisciplineController(); 