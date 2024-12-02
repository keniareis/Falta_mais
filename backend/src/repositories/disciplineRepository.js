import Discipline from "../models/discipline.js";

class DisciplineRepository{
    findAll = async () => {
        return await Discipline.find();
    };
}

export default new DisciplineRepository();