import disciplineService from "../services/DisciplineService.js"

class DisciplineController{
    async createDiscipline(req, res) {
        try {
            const { name, total_classes, max_absences, current_absence } = req.body;    
            const discipline = { name, total_classes, max_absences, current_absence };
            const savedDiscipline = await disciplineService.createDiscipline(discipline);
    
            res.status(201).json(savedDiscipline);
        } catch (error) {
            res.status(500).json({ error: "Error to create discipline: " + error.message });
        }
    }

    async getAllDisciplines(req, res){
        try{
            const row = await disciplineService.getAllDisciplines();
            res.status(200).json(row);
        } catch(error){
            res.status(500).json({error: "Error fetching disciplines: " + error.message })
        }
    }

    async getDisciplineById(req, res){
        try{
            const row = await disciplineService.getDisciplineById(req.params.id);
            res.json(row);
        } catch(error){
            res.status(500).json({ error: "Error fetching discipline: " + error.message})
        }
    }
    
    async updateDiscipline(req, res){
        const { id } = req.params;
        const updates = req.body;

        try{
            const updatedDiscipline = await disciplineService.updateDiscipline(id, updates);
            
            if(!updatedDiscipline){
                return res.status(404).json({ error: "Discipline not found!" });
            }

            res.status(200).json(updatedDiscipline);
        } catch(error){
            res.status(500).json({ error: "Error updating discipline: " + error.message });
        }

    }    

    async deleteDiscipline(req, res) {
        const id = req.params.id;

        try{
            const idExists = await disciplineService.getDisciplineById(id);
        
            if(!idExists){
               return res.status(404).json({Erro: 'Id does not exist'});
            }
            
            const row = await disciplineService.deleteDiscipline(id);
            res.json(row);
        }catch(error){
            res.status(500).json({ error: "Error deleting discipline: " + error.message });
        }
    }
}

export default new DisciplineController(); 