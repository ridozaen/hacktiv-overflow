const User = require('../models/users')
const Question = require('../models/questions')
const Answer = require('../models/answers')

module.exports = {
    retrieveAnswers: (req, res) => {
        Answer.find().sort({ createdAt: -1 })
            .populate('ownerId')
            .populate('questionId')
            .then(answers => {
                res.status(200).json({
                    message: 'retrieve all answers success',
                    answers
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'retrieve answers failed',
                    error: error.message
                })
            })
    },
    fetchAnswer: (req, res) => {
        let _id = req.params.id
        Answer.findById({ _id })
            .populate('ownerId')
            .populate('questionId')
            .then(answer => {
                res.status(200).json({
                    message: 'fetch answer success',
                    answer
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'fetch answer failed',
                    error: error.message
                })
            })
    },
    addAnswer: (req, res) => {
        let ownerId = req.user.id
        let {answer, questionId} = req.body
        let newAnswer = new Answer ({
          answer,
          questionId,
          ownerId
        })
    
        newAnswer.save()
          .then(responseAnswer => {
            Question.findByIdAndUpdate({
              _id: questionId
            }, {
              $push: { answersId: newAnswer._id }
            })
              .then(responseQuestion => {
                res.status(201).json({
                  message: 'Add answer success',
                  answer: responseAnswer
                })
              })
              .catch(error => {
                res.status(400).json({
                  message: 'Add answer failed',
                  error: error.message
                })
              })
          })
          .catch(error => {
            res.status(400).json({
              message: 'Add answer failed',
              error: error.message
            })
          })
      },
      upVoteAnswer: (req, res) => {
        let voterId = req.user.id
        let _id = req.params.id
    
        Answer.findByIdAndUpdate({_id}, {
          $addToSet: { votersId: voterId }
        })
          .then(response => {
            res.status(200).json({
              message: 'Upvote answer success',
              answer: response
            })
          })
          .catch(error => {
            res.status(400).json({
              message: 'Upvote answer failed',
              error: error.message
            })
          })
      },
      downVoteAnswer: (req, res) => {
        let voterId = req.user.id
        let _id = req.params.id
    
        Answer.findByIdAndUpdate({_id}, {
          $pull: { votersId: voterId }
        })
          .then(response => {
            res.status(200).json({
              message: 'Downvote answer success',
              answer: response
            })
          })
          .catch(error => {
            res.status(400).json({
              message: 'Downvote answer failed',
              error: error.message
            })
          })
      },
      deleteAnswer: (req, res) => {
          let _id = req.params.id
        Answer.deleteOne({_id})
          .then(responseAnswer => {
            Question.findByIdAndUpdate({_id: req.body.questionId}, {
              $pull: { answersId: _id }
            })
              .then(responseQuestion => {
                res.status(200).json({
                  message: 'Delete answer success',
                  answer: responseAnswer
                })
              })
              .catch(error => {
                res.status(400).send({
                  message: 'Delete answer failed',
                  error: error.message
                })
              })
          })
          .catch(error => {
            res.status(400).send({
              message: 'Delete post failed',
              error: error.message
            })
          })
      }    
}