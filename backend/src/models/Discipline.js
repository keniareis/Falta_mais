import mongoose from "mongoose";

const DisciplineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    total_classes: {},
    total_absence: {},
    current_absence: {}
});