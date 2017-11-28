<template>
  <div class="screen">

    <div class="screen__enemies">
      <Entity v-for="e in enemies" type="enemy" v-bind:key="e.id" v-bind:info="e" >{{e.name}}</Entity>
    </div>
    <div class="screen__interaction">
      <Messages></Messages>
    </div>
    <div class="screen__hero">
      <Entity v-bind:info="heroInfo" type="hero" ></Entity>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Entity from "./Entity.vue";
  import Messages from "./Messages.vue";
  import * as CONSTANTS from '../constants'

  export default {
    name: 'Screen',
    components: { Entity, Messages },
    data: () => {
      return {
        CONSTANTS: CONSTANTS,
      }
    },
    computed: {
      ...mapGetters(['heroInfo', 'enemies', 'battlePhase', 'gameOnGoing']),
    }
  };
</script>

<style lang="scss" scoped >

  .screen {
    flex-grow: 2;
    background: #9cff8c;
    display: flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
  }
</style>
