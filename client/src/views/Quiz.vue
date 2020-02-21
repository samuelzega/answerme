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
      <button type="button" @click="questionCount" class="btn btn-success">
        <h2>Start</h2>
      </button>

      <div class="card container">
        <div class="card-body">
          <h2 v-html="$store.state.question"></h2>
        </div>
      </div>

      {{ $store.state.answer }}
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
      data: []
    }
  },
  created() {},
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
      if (this.countDown === 0) {
        this.countDown = 15
      }
    },

    btnTrue() {
      if (this.$store.state.answer === 'True') {
        console.log('jawabanmu benar')
      } else {
        console.log('jawaban lo salah')
      }
    },
    btnFalse() {
      if (this.$store.state.answer === 'False') {
        console.log('jawabanmu benar')
      } else {
        console.log('jawaban lo salah')
      }
    },
    questionCount() {
      this.$store.dispatch('getQuiz')
      let questionOne = setInterval(() => {
        this.$store.dispatch('getQuiz')
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
  margin-top: 33vh;
}
.card {
  width: 800px;
  height: 150px;
  font-family: 'Krona One';
  margin-bottom: 50px;
  border-color: crimson;
  margin-top: 3vh;

  border-style: dotted;
  border-width: thick;
  border-color: red green blue yellow;
}
h1 {
  color: chartreuse;
  font-weight: 800;
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
  margin-top: 12vh;
  font-family: 'Krona One', 'Special Elite';
}
</style>
