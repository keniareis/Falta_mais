import Discipline from "../models/discipline.js";

class DisciplineService{

    getAllDisciplines = async () => {
        const disciplines = await Discipline.find();
        return disciplines;
    }

    getDisciplineById = async (id) => {
        const discipline = await Discipline.findById(id);
        return discipline;
    }

    createDiscipline = async (discipline) => {
        try{
            const newDiscipline = await Discipline.create(discipline);
            return newDiscipline;
        }catch(error){
            throw new Error("Error to save discipline: " + error.message);
        }
    }

    updateDiscipline = async (id, updates) => {
        const updatedDiscipline = await Discipline.findByIdAndUpdate(
            id, 
            updates,
            {new: true} // Garante que o documento atualizado seja retornado
        );

        return updatedDiscipline;
    }

    deleteDiscipline = async (id) => {
        const discipline = await Discipline.deleteOne({_id: id});
        return discipline;
    }
}
export default new DisciplineService();