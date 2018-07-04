const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/authentication');
const isAuthorized = require('../middlewares/authorization')
const questionController = require('../controllers/questionController');

router.get('/',questionController.retrieveQuestion)
router.get('/users/:id', isAuthenticated, questionController.findQuestionByUserId)
router.get('/:id', questionController.fetchQuestion)
router.post('/add',isAuthenticated,questionController.addQuestion)
router.put('/update/:id', isAuthenticated, questionController.updateQuestion)
router.put('/upvote/:id', isAuthenticated, questionController.upVoteQuestion)
router.put('/downvote/:id', isAuthenticated, questionController.downVoteQuestion)
router.delete('/delete/:id',isAuthenticated, isAuthorized, questionController.deleteQuestion)

module.exports = router