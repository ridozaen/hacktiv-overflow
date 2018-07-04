const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    answer: {type: String, required: true},
    questionId: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
    ownerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    votersUpId: [{type: Schema.Types.ObjectId, ref: 'User'}],
    votersDownId: [{type: Schema.Types.ObjectId, ref: 'User'}],
},{
    timestamps: true
})

module.exports = mongoose.model('Answer',answerSchema);