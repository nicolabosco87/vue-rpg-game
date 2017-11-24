import Vue from 'vue'
import Vuex from 'vuex'
import game from './modules/game'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const actions = {

}

const getters = {

}

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    game,
  },
  strict: debug,
});
