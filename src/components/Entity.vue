<template>
  <div v-bind:class="{ entity: true, entityHero: type == 'hero'}">
    <h3>{{info.name}}</h3>
  </div>
</template>

<script>
  export default {
    name: 'Entity',
    props: ['type', 'info'],
    computed: {}
  };
</script>

<style lang="scss" scoped >

  .entity {
    border: 3px solid #80361f;
    background: #803200;
    color: white;
    display: inline-block;
    width: 150px;
    padding: 30px 20px;


    &.entityHero {
      border: 3px solid green;
      background: forestgreen;
    }
  }


</style>
