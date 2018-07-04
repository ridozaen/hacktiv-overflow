import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    question: {},
    currUser: {}
  },
  mutations: {
    setQuestions: (state, data) => {
      state.questions = data
    },
    setQuestion: (state, data) => {
      state.question = data
    },
    setAnswers: (state, data) => {
      state.answers = data
    },
    setCurrUser: (state, data) => {
      let token = localStorage.getItem('curr-token')
      let user = jwt.decode(token)
      if (user) {
        state.currUser = user
      }
    },
    clearCurrUser: (state, data) => {
      state.currUser = {}
    },
    addQuestion: (state, data) => {
      state.questions.unshift(data)
    },
    addAnswer: (state, data) => {
      state.question.answersId.push(data)
    },
    addQuestionUp: (state) => {
      // console.log('addQuestionUp', data)
      let indexUp = state.question.votersUpId.findIndex(x => x === state.currUser.id)
      if (indexUp === -1) {
        state.question.votersUpId.push(state.currUser.id)
      }

      let indexDown = state.question.votersDownId.findIndex(x => x === state.currUser.Id)
      if (indexDown !== -1) {
        state.question.votersDownId.splice(indexDown, 1)
      }
    },
    addQuestionDown: (state) => {
      let indexUp = state.question.votersUpId.findIndex(x => x === state.currUser.id)
      if (indexUp !== -1) {
        state.question.votersIdUp.splice(indexUp, 1)
      }
      let indexDown = state.question.votersDownId.findIndex(x => x === state.currUser.id)
      if (indexDown === -1) {
        state.question.votersDownId.push(state.currUser.id)
      }
    },
    addAnswerUp: (state, answer) => {
      // console.log('addQuestionUp', data)
      // let answers = state.question.answerId
      let index = state.question.answersId.findIndex(x => x._id === answer._id)
      let currAnswer = state.question.answersId[index]
      let indexUp = currAnswer.votersUpId.findIndex(x => x === state.currUser.id)
      console.log('indexUp', indexUp)
      if (indexUp === -1) {
        currAnswer.votersUpId.push(state.currUser.id)
      }

      let indexDown = currAnswer.votersDownId.findIndex(x => x === state.currUser.Id)
      if (indexDown !== -1) {
        currAnswer.votersDownId.splice(indexDown, 1)
      }
    },
    addAnswerDown: (state, answer) => {
      // console.log('addQuestionUp', data)
      // let answers = state.question.answerId
      let index = state.question.answersId.findIndex(x => x._id === answer._id)
      let currAnswer = state.question.answersId[index]

      let indexUp = currAnswer.votersUpId.findIndex(x => x === state.currUser.id)
      if (indexUp !== -1) {
        currAnswer.votersUpId.splice(indexUp, 1)
      }

      let indexDown = currAnswer.votersDownId.findIndex(x => x === state.currUser.Id)
      if (indexDown === -1) {
        currAnswer.votersDownId.push(state.currUser.Id)
      }
    }
  },
  actions: {
    getQuestionList: ({ commit }) => {
      axios.get('/questions')
        .then(response => {
          console.log(response.data.questions)
          commit('setQuestions', response.data.questions)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    getQuestionById: ({ commit }, id) => {
      console.log('id:', id)
      axios.get(`/questions/${id}`)
        .then(response => {
          console.log(response.data.question)
          commit('setQuestion', response.data.question)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    loginActions: ({ commit }, objUser) => {
      console.log('login', objUser)
      commit('setCurrUser', objUser)
    },
    addQuestion: ({ commit }, question) => {
      console.log('add question', question)
      let token = localStorage.getItem('curr-token')
      axios.post('/questions/add', question, {
        headers: {
          authorization: token
        }
      })
        .then(response => {
          console.log('add question success', response.data)
          commit('addQuestion', response.data.question)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addAnswer: ({ commit }, content) => {
      console.log('answer store', content)
      let token = localStorage.getItem('curr-token')
      axios.post('/answers/add', content, {
        headers: {
          authorization: token
        }
      })
        .then(response => {
          console.log('add answer success ', response.data.answer)
          commit('addAnswer', response.data.answer)
        })
        .catch(err => {
          console.log(err)
        })
    },
    voteQuestionUp: ({ commit }, content) => {
      console.log('vote Up question')
      let questionId = content
      let token = localStorage.getItem('curr-token')
      axios.put(`/questions/upvote/${questionId}`, {}, {
        headers: {
          authorization: token
        }
      })
        .then(response => {
          console.log(response.data.question)
          commit('addQuestionUp')
        })
        .catch(err => {
          console.log(err)
        })
    },
    voteQuestionDown: ({ commit }, content) => {
      console.log('vote down question')
      let questionId = content
      let token = localStorage.getItem('curr-token')
      axios.put(`/questions/downvote/${questionId}`, {}, {
        headers: {
          authorization: token
        }
      })
        .then(response => {
          console.log(response.data.question)
          // let voters = response.data.question.ownerId
          commit('addQuestionDown')
        })
        .catch(err => {
          console.log(err)
        })
    },
    voteAnswerUp: ({ commit }, answer) => {
      console.log('vote up answer')
      let answerId = answer._id
      let token = localStorage.getItem('curr-token')
      axios.put(`/answers/upvote/${answerId}`, {}, {
        headers: {
          authorization: token
        }
      })
        .then(response => {
          console.log(response.data.answer)
          // let voters = response.data.answer._id
          commit('addAnswerUp', response.data.answer)
        })
        .catch(err => {
          console.log(err)
        })
    },
    voteAnswerDown: ({ commit }, answer) => {
      console.log('vote down answer')
      let answerId = answer._id
      let token = localStorage.getItem('curr-token')
      axios.put(`/answers/downvote/${answerId}`, {}, {
        headers: {
          authorization: token
        }
      })
        .then(response => {
          console.log(response.data.answer)
          // let voters = response.data.answer._id
          commit('addAnswerDown', response.data.answer)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findQuestionByUser: ({ commit }, userId) => {
      let token = localStorage.getItem('curr-token')
      axios.get(`/questions/users/${userId}`, {
        headers: {
          authorization: token
        }
      })
        .then(response => {
          console.log(response.data.questions)
          commit('setQuestions', response.data.questions)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findAnswerByUser: ({ commit }, userId) => {
      let token = localStorage.getItem('curr-token')
      axios.get(`/answers/users/${userId}`, {
        headers: {
          authorization: token
        }
      })
        .then(response => {
          console.log(response.data.answers)
          commit('setAnswers', response.data.answers)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editQuestion: ({ commit, dispatch }, data) => {
      let token = localStorage.getItem('curr-token')
      console.log('data ', data)
      axios.put(`/questions/update/${data.id}`, { title: data.title, content: data.content }, {
        headers: {
          authorization: token
        }
      })
        .then(response => {
          console.log('update question success', response.data.question)
          dispatch('getQuestionById', response.data.question._id)
        })
        .catch(err => {
          console.log('error', err)
        })
    },
    deleteQuestion: ({ commit }, question) => {
      let token = localStorage.getItem('curr-token')
    },
    deleteAnswer: ({ commit }, answer) => {
      let token = localStorage.getItem('curr-token')
    }
  }
})
