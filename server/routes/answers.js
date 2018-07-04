const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/authentication')
const isAuthorized = require('../middlewares/authorization')
const answerController = require('../controllers/answerController')

router.get('/',answerController.retrieveAnswers)
router.get('/users/:id',answerController.findAnswerByUserId)
router.get('/:id',answerController.fetchAnswer)
router.post('/add',isAuthenticated, answerController.addAnswer)
router.put('/upvote/:id', isAuthenticated, answerController.upVoteAnswer)
router.put('/downvote/:id', isAuthenticated, answerController.downVoteAnswer)
router.delete('/delete/:id', isAuthenticated, isAuthorized, answerController.deleteAnswer)

module.exports = router