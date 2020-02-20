<template>
    <div>
        <div class="card container">
            <div class="card-body">
                <h2 v-html="$store.state.question"></h2>
            </div>
        </div>
        <button type="button" @click="questionCount" class="btn btn-success" ><h2>Start</h2></button>
        <h1 class="display-1">{{ countDown }}</h1>
        {{$store.state.answer}}
        <button @click="btnTrue">true</button>
        <button @click="btnFalse">false</button>
    </div>
</template>

<script>
export default {
    name: 'quiz',
    data() {
        return {
            countDown : 15,
            data: []
        }
    },
    created() {

    },
    methods: {
        countDownTimer() {
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
            if (this.countDown === 0) {
                this.countDown = 15
            }
        },

        btnTrue(){
            if (this.$store.state.answer === 'True') {
                console.log('jawabanmu benar');
            } else {
                console.log('bego jawaban lo salah');
            }
        },
        btnFalse(){
             if (this.$store.state.answer === 'False') {
                console.log('jawabanmu benar');
            } else {
                console.log('bego jawaban lo salah');
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

    },
}
</script>

<style scoped>
.card {
    width: 800px;
    height: 250px;
    font-family: 'Krona One';
    margin-bottom: 50px;
    border-color:crimson;
}
h1 {
    color:maroon;
    font-weight: 800;
}
</style>