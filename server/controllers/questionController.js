const User = require('../models/users');
const Answer = require('../models/answers');
const Question = require('../models/questions');

module.exports = {
  retrieveQuestion: (req, res) => {
    Question.find().sort({createdAt: -1})
      .populate('ownerId')
      .populate({
        path: 'answersId', populate: [{ path: 'ownerId' }]
      })
      .then(questions => {
        res.status(200).json({
          message: 'Retrieve questions success',
          questions
        })
      })
      .catch(err => {
        res.status(400).json({
          error: err.message
        })
      })
  },
  findQuestionByUserId: (req,res) => {
    let _id = req.params.id
    Question.find({ownerId: _id})
    .populate('ownerId')
    .then(questions=>{
      res.status(200).json({
        message: 'retrieve questions by user success',
        questions
      })
    })
    .catch(err=>{
      res.status(400).json({
        error: err.message
      })
    })
  },
  fetchQuestion: (req, res) => {
    let _id = req.params.id
    Question.findById({ _id })
      .populate('ownerId')
      .populate({
        path: 'answersId', populate: [{ path: 'ownerId' }]
      })
      .then(question => {
        res.status(200).json({
          message: 'fetch question success',
          question
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'Show post failed',
          error: error.message
        })
      })
  },
  addQuestion: (req, res) => {
    let ownerId = req.user.id
    let { title, content } = req.body
    let question = new Question({
      title, content, ownerId
    })

    question.save()
      .then(response => {
        res.status(201).json({
          message: 'create question success',
          question: response
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'create question failed',
          error: error.message
        })
      })
  },
  updateQuestion: (req, res) => {
    let _id = req.params.id
    let { title, content } = req.body
    Question.findByIdAndUpdate({ _id }, {
      title, content
    })
      .then(response => {
        res.status(200).json({
          message: 'Update question success',
          question: response
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'Update question failed',
          error: error.message
        })
      })
  },
  upVoteQuestion: (req, res) => {
    let _id = req.params.id
    let voterId = req.user.id

    Question.findByIdAndUpdate({ _id }, {
      $addToSet: { votersUpId: voterId },
      $pull: {votersDownId: voterId}
    })
      .then(response => {
        res.status(200).json({
          message: 'Upvote success',
          question: response
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'Upvote failed',
          error: error.message
        })
      })
  },
  downVoteQuestion: (req, res) => {
    let _id = req.params.id
    let voterId = req.user.id

    Question.findOneAndUpdate({ _id }, {
      $addToSet: { votersDownId: voterId },
      $pull: {votersUpId: voterId}
    })
      .then(response => {
        res.status(200).json({
          message: 'Downvote success',
          question: response
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'Downvote failed',
          error: error.message
        })
      })
  },
  deleteQuestion: (req, res) => {
    let _id = req.params.id
    Question.deleteOne({ _id })
      .then(response => {
        Answer.remove({ questionId: _id })
          .then(result => {
            res.status(200).json({
              message: 'Delete question success',
              response
            })
          })
          .catch(error => {
            res.status(400).json({
              message: 'Delete question failed',
              error: error.message
            })
          })
      })
      .catch(error => {
        res.status(400).json({
          message: 'Delete question failed',
          error: error.message
        })
      })
  }
}
