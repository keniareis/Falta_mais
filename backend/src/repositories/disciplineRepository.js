import Discipline from "../models/discipline.js";

class DisciplineRepository{
    findAll = async () => {
        return await Discipline.find();
    };

    findById = async (id) => {
        return await Discipline.findById(id);
    };

    create = async (data) => {
        return await Discipline.create(data);
    };

}

export default new DisciplineRepository();