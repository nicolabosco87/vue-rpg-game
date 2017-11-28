<template>
  <div class="messages" >

    <h1 v-if="!gameOnGoing">GAME OVER!</h1>

    <ul>
      <li v-for="m in messages" >{{ m }}</li>
    </ul>

    <div v-if="!gameOnGoing" >
      <button @click="startNewGame" >Start new game!</button>
    </div>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import * as CONSTANTS from '../constants'

  export default {
    name: 'Entity',
    props: [],
    methods: {
      startNewGame() {
        this.gameStart();
      },
    },
    computed: {
      ...mapGetters(['messages', 'gameOnGoing']),
      ...mapActions(['gameStart']),
    }
  };
</script>

<style lang="scss" scoped >

  .messages {
    margin: 20px 0;
    border: 3px solid #b1b547;
    background: #b5ab4e;
    color: white;
    display: inline-block;
    padding: 10px 20px;

    ul {
      text-align: left;

      li {
        margin-bottom: 10px;
      }
    }
  }


</style>
