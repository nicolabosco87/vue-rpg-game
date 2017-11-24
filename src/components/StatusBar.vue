<template>
  <div class="status-bar">

    <div v-bind:class="{ 'status-bar__turn': true, 'status-bar__turn--hero': heroTurn }">
      {{battlePhaseLabel}}
    </div>

    <div class="status-bar__actions">
      <button @click="" v-bind:disabled="!heroTurn">Fight</button>
      <button v-bind:disabled="!heroTurn" >Firebolt</button>
    </div>

    <div class="status-bar__status">
      <h3>Status</h3>
      Level: {{heroStatus.level}}
      <br>
      life: {{heroLifePerc}}%
    </div>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  export default {
    name: 'StatusBar',
    computed: {
      ...mapGetters(['heroStatus', 'heroLifePerc', 'heroTurn', 'battlePhaseLabel']),
    },
    methods: {
      ...mapActions(['']),
      actionFight() {

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
    background: grey;
    display: flex;
    flex-direction: column;
  }

</style>
