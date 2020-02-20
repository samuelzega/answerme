import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseURL = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
      question: '',
      answer: '',

  },
  mutations: {
      SET_QUESTION(state, payload) {
        state.question = payload
      },
      SET_ANSWER(state, payload) {
        state.answer = payload
      },

  },
  actions: {
      getQuiz(context) {
          axios({
            url: `${baseURL}/quiz`,
            method: 'GET',
          })
          .then(({ data }) => {
            console.log(data)
            context.commit('SET_QUESTION', data.results[0].question)
            context.commit('SET_ANSWER', data.results[0].correct_answer)
          })
          .catch(error => {
            console.log(error)
          })
      },

  },
  modules: {
  }
})
