<template>
  <div class="landingPage">
    <video id="videoBackground" autoplay muted loop>
      <source
        src="https://ak3.picdn.net/shutterstock/videos/1010379113/preview/stock-footage-three-men-watching-football-competition-on-big-screen-cheering-best-soccer-team.webm"
        type="video/mp4"
      />
    </video>

    <div>
      <h1 class="display-1">{{ countDown }}</h1>
      <h3>{{ result }}</h3>
      <h3>{{ hasil }}</h3>
      <button type="button" @click="questionCount" class="btn btn-success">
        <h2>Start</h2>
      </button>

      <div class="card container">
        <div class="card-body">
          <h2 v-html="question"></h2>
        </div>
      </div>

      <!-- {{ $store.state.answer }} -->
      <div class="btnAnswer">
        <button class="btn btn-warning btnWrong" @click="btnTrue">true</button>
        <button class="btn btn-info btnRight" @click="btnFalse">false</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quiz',
  data() {
    return {
      countDown: 15,
      data: [],
      count: 0,
      question: '',
      good: 0,
      bad: 0,
      result: '',
      hasil: ''
    }
  },
  created() {
    this.$store.dispatch('getQuiz')

    console.log(this.$store.state.question)
    console.log(this.$store.state.answer)
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
      if (this.countDown === 0) {
        this.countDown = 'Thanks for Playing'
        this.result = `
                      ${this.good} Good Answer,
                      ${this.bad} Bad Answer
                      `
        this.$socket.emit('game-finish', {
          role: this.$store.state.role,
          result: this.good
        })

        this.$socket.on('winner', payload => {
          console.log(payload, ' ini data player semua')
          this.hasil = `
                      ${payload[0].name} = ${payload[0].score} ,
                      ${payload[1].name} = ${payload[1].score} 
                      `
        })

        setTimeout(() => {
          this.$router.push({
            path: '/'
          })
        }, 10000)
      }
    },

    btnTrue() {
      if (this.$store.state.answer[this.count] === 'True') {
        console.log('jawabanmu benar')
        this.good += 1
      } else {
        console.log('jawaban lo salah')
        this.bad += 1
      }
    },
    btnFalse() {
      if (this.$store.state.answer[this.count] === 'False') {
        console.log('jawabanmu benar')
        this.good += 1
      } else {
        console.log('jawaban lo salah')
        this.bad += 1
      }
    },
    questionCount() {
      this.countDown = 15
      this.count = 0
      this.result = ''
      // this.$store.dispatch('getQuiz')
      this.question = this.$store.state.question[0]
      let questionOne = setInterval(() => {
        // this.$store.dispatch('getQuiz')
        this.count += 1
        this.question = this.$store.state.question[this.count]
      }, 5000)
      setTimeout(() => {
        clearInterval(questionOne)
      }, 10000)
      this.countDownTimer()
    }
  }
}
</script>

<style scoped>
.landingPage {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
}
.landingPage video {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: -5;
  position: absolute;
  pointer-events: none;
}
.btn-success {
  margin-top: 30vh;
}
.card {
  width: 1200px;
  height: 200px;
  font-family: 'Krona One';
  margin-bottom: 50px;
  border-color: crimson;
  margin-top: 1vh;

  border-style: dotted;
  border-width: thick;
  border-color: red green blue yellow;
}
h1 {
  color: chartreuse;
  font-weight: 800;
}
h3 {
  color: chartreuse;
  font-weight: 700;
}

.btnRight {
  margin-left: 5vw;
  box-shadow: 5px 5px 18px yellow;
  width: 12vw;
  font-size: xx-large;
}

.btnWrong {
  margin-right: 5vw;
  box-shadow: 5px 5px 18px lightgreen;
  width: 12vw;
  font-size: xx-large;
}

.btnAnswer {
  /* width: 10vw; */
  font-family: 'Krona One', 'Special Elite';
}
</style>
