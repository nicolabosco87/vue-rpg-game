<template>
  <div class="status-bar">

    <div v-bind:class="{ 'status-bar__turn': true, 'status-bar__turn--hero': heroTurn }">
      {{battlePhaseLabel}}
    </div>

    <div class="status-bar__actions">
      <button @click="actionFight" v-bind:disabled="!heroTurn || !gameOnGoing">Attack</button>
      <button @click="actionFirebolt" v-bind:disabled="!heroTurn || !gameOnGoing" >Firebolt</button>
    </div>

    <div class="status-bar__status">
      <h3>Status</h3>
      Level: {{heroInfo.level}}
      <br>
      life: {{heroLifePerc}}%
    </div>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import * as CONSTANTS from '../constants'

  export default {
    name: 'StatusBar',
    computed: {
      ...mapGetters(['heroInfo', 'heroLifePerc', 'heroTurn', 'battlePhaseLabel', 'gameOnGoing']),
    },
    data: () => {
      return {
        CONSTANTS: CONSTANTS,
      }
    },
    methods: {
      ...mapActions(['battlePhase']),
      actionFight() {
          this.battlePhase(CONSTANTS.MOVE_ATTACK)
      },

      actionFirebolt() {
        this.battlePhase(CONSTANTS.MOVE_FIREBOLT)
      }
    }
  };
</script>

<style lang="scss">

  .status-bar {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: stretch;
    position: relative;
  }

  .status-bar__turn {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 5;
    border: 2px solid white;
    color: white;
    padding: 5px 10px;
  }

  .status-bar__actions {
    width: 70%;
    background: darkslategrey;
    display: flex;
    justify-content:center;
    align-items:center;

    button {
      margin: 10px;
      padding: 20px 30px;
    }
  }

  .status-bar__status {
    width: 30%;
    background: #cccccc;
    display: flex;
    flex-direction: column;
  }

</style>
