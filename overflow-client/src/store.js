import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: []
  },
  mutations: {
    setQuestions: (state, data) => {
      state.questions = data
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
    }
  }
})
