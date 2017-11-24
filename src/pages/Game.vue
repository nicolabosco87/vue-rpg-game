<template>
  <div class="layout">
    <div v-if="!isGameActive"  >
      <h2></h2>
      <button v-on:click="gameStart" >Start game</button>
    </div>
    <div v-if="isGameActive" class="layout">
      <Screen></Screen>
      <StatusBar></StatusBar>
    </div>
  </div>
</template>

<script>
import StatusBar from '../components/StatusBar';
import Screen from '../components/Screen';
import * as CONSTANTS from "../constants";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Game',
  components: { StatusBar, Screen },
  computed: {
    ...mapGetters(['gameState']),
    isGameActive() {
      return (this.gameState == CONSTANTS.GAME_STATUS_ONGOING)
    }
  },
  methods: {
    ...mapActions(['gameStart', 'gameEnd']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >

.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
}

</style>
