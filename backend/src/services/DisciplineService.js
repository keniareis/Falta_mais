import disciplineRepository from "../repositories/disciplineRepository.js";

class DisciplineService{

    getAllDisciplines = async () => {
        const disciplines = await disciplineRepository.findAll();
        return disciplines;
    }
}
export default new DisciplineService();