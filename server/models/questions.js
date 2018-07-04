const mongoose =require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
    title: {type: String,required: true},
    content: {type: String, required: true},
    ownerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    // votersId: [{type: Schema.Types.ObjectId, ref: 'User'}],
    votersUpId: [{type: Schema.Types.ObjectId, ref: 'User'}],
    votersDownId: [{type: Schema.Types.ObjectId, ref: 'User'}],
    answersId: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
},{
    timestamps: true
})

module.exports = mongoose.model('Question',questionSchema);