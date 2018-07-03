const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    answer: {type: String, required: true},
    questionId: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
    ownerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    votersId: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Answer',answerSchema);