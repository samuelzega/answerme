import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseURL = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    question: '',
    answer: '',
    allRooms: null
  },
  mutations: {
    SET_QUESTION(state, payload) {
      state.question = payload
    },
    SET_ANSWER(state, payload) {
      state.answer = payload
    },
    SET_ALLROOMS(state, payload) {
      state.allRooms = payload
    }
  },
  actions: {
    getQuiz(context) {
      axios({
        url: `${baseURL}/quiz`,
        method: 'GET'
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
    getRooms(context) {
      console.log('masuk sini')

      axios({
        url: `${baseURL}/rooms`,
        method: 'GET'
      })
        .then(({ data }) => {
          console.log(data, 'kasdbka')

          context.commit('SET_ALLROOMS', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
