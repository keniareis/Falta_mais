import disciplineRepository from "../repositories/disciplineRepository.js";

class DisciplineService{

    getAllDisciplines = async () => {
        const disciplines = await disciplineRepository.findAll();
        return disciplines;
    }

    getDisciplineById = async (id) => {
        const discipline = await disciplineRepository.findById(id);
        return discipline;
    }

    createDiscipline = async (data) => {
        const newDiscipline = await disciplineRepository.create(data);
        return newDiscipline;

    }
}
export default new DisciplineService();