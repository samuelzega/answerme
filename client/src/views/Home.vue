<template>
  <div class="landingPage">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <video
      id="videoBackground"
      autoplay
      muted
      loop
      src="https://www.videvo.net/videvo_files/converted/2016_03/preview/Chess_15_Videvo.mov67394.webm"
      type="video/mp4"
    ></video>
    <div class="buttonPlay">
      <el-button
        @click="insertName"
        v-show="show.buttonStart"
        class="buttonNya"
        type="info"
        round
        >Enter the Game</el-button
      >
      <br />

      <input
        v-show="show.inputName"
        v-model="form.name"
        type="text"
        autocomplete="off"
        placeholder="Please input your name"
        class="el-input__inner inputNya"
      />
      <br />
      <el-button @click="login" v-show="show.inputName" type="info" round
        >enter</el-button
      >
    </div>
    <div v-if="show.rooms">
      <input
        v-model="form.roomname"
        type="text"
        autocomplete="off"
        placeholder="Please input your name"
        class="el-input__inner inputNya"
      />
      <el-button @click="addroom" type="info" round>Add room</el-button>
      <br />
      <div style="margin-top:20vh;">
        <b-card-group>
          <div v-for="(item, i) in allRooms" :key="i">
            <b-card
              bg-variant="dark"
              style="border-radius:15px; margin-left:5vw; margin-top:5vh; cursor:pointer"
              @click="masukRoom(item.name)"
              text-variant="white"
              :header="item.name"
              class="text-center"
            >
              <b-card-text>Maybe add a password here</b-card-text>
            </b-card>
          </div>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      form: {
        name: '',
        roomname: ''
      },
      show: {
        inputName: false,
        buttonStart: true,
        rooms: false
      }
    }
  },
  methods: {
    insertName() {
      this.show.inputName = true
      this.show.buttonStart = false
      this.show.rooms = false
    },
    login() {
      localStorage.setItem('name', this.form.name)
      this.show.inputName = false
      this.show.buttonStart = false
      this.show.rooms = true
      this.$store.dispatch('getRooms')
    },
    addroom() {
      this.$socket.emit('create-room', { name: this.form.roomname })
      // localStorage.setItem("roomname", this.form.roomname);
      console.log(this.form.roomname)
      let listenRoom = 'datagame' + this.form.roomname
      console.log(listenRoom)
      setTimeout(() => {
        this.$store.dispatch('getRooms')
      }, 2000)
    },
    masukRoom(name) {
      this.$socket.emit('game-start', name)
      let listenRoom = 'datagame' + name
      this.$socket.on(listenRoom, payload => {
        console.log(payload)
        console.log('datagame tambah roomname nih')
      })
    }
  },
  computed: {
    allRooms() {
      return this.$store.state.allRooms
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Trade+Winds&display=swap');
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
  font-family: 'Kelly Slab', cursive;
}
.landingPage .content {
  position: relative;
  color: aliceblue;
}

.cardNya {
  width: 25vw;
  background-color: rgba(58, 44, 47, 0.94);
  border-radius: 20px;
  color: gold;
}

.buttonPlay {
  margin-top: 40vh;
}

.buttonNya {
  width: 25vw;
  height: 8vh;
  font-size: 250%;
  font-family: 'Trade Winds';
  background-color: rgb(48, 45, 45);
}

.buttonNya:hover {
  box-shadow: 0 4px 8px 0 rgb(68, 65, 65), 0 6px 20px 0 grey;
  background-color: rgb(70, 72, 73);
}
.inputNya {
  margin-top: 5vh;
  background-color: rgb(36, 34, 34);
  color: rgb(218, 165, 32);
  width: 30vw;
  text-align: center;
  height: 5vh;
}

.inputNya ::placeholder {
  color: rgb(218, 165, 32);
  text-align: center;
}
</style>
