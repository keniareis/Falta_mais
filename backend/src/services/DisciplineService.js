import Discipline from "../models/discipline.js";

class DisciplineService{
    getAllDisciplines = async () => {
        const disciplines = await Discipline.find();
        return disciplines;
    }
}
export default new DisciplineService();