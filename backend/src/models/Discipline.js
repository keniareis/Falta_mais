import mongoose from "mongoose";

const DisciplineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    total_classes: {
        type: Number,
        required: true,
    },
    
    total_absence: {
        type: Number,
        required: true,
    },
    
    current_absence: {
        type: Number,
        required: true,
    }
});

// Criação do modelo com mongoose.model
const Discipline = mongoose.model("Discipline", DisciplineSchema);

export default Discipline;
