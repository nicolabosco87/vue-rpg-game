<template>
  <div class="screen">

    <h2>{{enemies}}</h2>
    <div class="screen__enemies">
      <Entity v-for="e in enemies" type="enemy" v-bind:key="e.id" v-bind:info="e" >{{e.name}}</Entity>
    </div>
    <div class="screen__interaction">
      <h2 v-if="battlePhase == CONSTANTS.BATTLE_PHASE_TURN_HERO_START">It's your turn. Choose the action.</h2>
      <h2 v-if="battlePhase == CONSTANTS.BATTLE_PHASE_TURN_HERO_END"></h2>
      <h2 v-if="battlePhase == CONSTANTS.BATTLE_PHASE_TURN_ENEMY_START">It's enemy turn</h2>
      <h2 v-if="battlePhase == CONSTANTS.BATTLE_PHASE_TURN_ENEMY_END">Enemy've done damage</h2>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Entity from "./Entity.vue";
  import * as CONSTANTS from '../constants'

  export default {
    name: 'Screen',
    components: { Entity },
    computed: {
      ...mapGetters(['enemies', 'battlePhase']),
    }
  };
</script>

<style lang="scss" scoped >

  .screen {
    flex-grow: 2;
    background: #9cff8c;
  }
</style>
