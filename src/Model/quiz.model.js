

import mongoose from 'mongoose';
const { Schema } = mongoose;

const quizSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    ans: {
        type: String,
        required: true
    }

});


const quiz = mongoose.model('quiz', quizSchema);


export default quiz