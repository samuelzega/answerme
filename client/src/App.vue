<template>
  <div id="app">
    <!-- <div id="nav">
      <input type="text" placeholder="room" v-model="roomname" />
      <button v-on:click.prevent="addroom">submit</button>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/quiz">Quiz</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      roomname: null,
      copyname: null
    }
  },
  methods: {
    addroom() {
      // this.$socket.emit("create-room", { name: this.roomname });
      this.$socket.emit('game-start', this.roomname)
      // localStorage.setItem("roomname", this.roomname);
      console.log(this.roomname)
      let listenRoom = 'datagame' + this.roomname
      console.log(listenRoom)
      this.$socket.on(listenRoom, payload => {
        console.log(payload[0])
        console.log('datagame tambah roomname nih')
      })
    }
  },
  mounted() {
    // this.$socket.on("sample", data => {
    //   console.log(data.message);
    //   this.copyname = data.roomname;
    // });
    // this.$socket.on("join-succes", data => {
    //   console.log(data);
    // });
    // this.$socket.on("join-failed", data => {
    //   // console.log(data);
    // });
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
