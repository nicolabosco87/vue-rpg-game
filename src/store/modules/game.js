import * as types from '../mutation-types';
import * as CONSTANTS from '../../constants';
import {getEnemies, Hero} from "../models/entities";


const state = {
  status: CONSTANTS.GAME_STATUS_STOP,
  level: 1,
  enemies: [],
  hero: null,
  battlePhase: 1,
}

const getters = {
  gameState: state => state.status,
  heroStatus: state => state.hero,
  enemies: state => state.enemies,
  level: state => state.level,
  heroMaxHp: state => (100 + (state.level * 10)),
  heroLifePerc: state => Math.floor(state.hero.hp * 100 / (90 + (state.level * 10))),
  heroTurn: state => state.battlePhase == CONSTANTS.BATTLE_PHASE_TURN_HERO_START,
  battlePhase: state => state.battlePhase,
  battlePhaseLabel: state => {
    switch (state.battlePhase) {
      case CONSTANTS.BATTLE_PHASE_TURN_HERO_START:
        return 'Hero - begin';
        break;
      case CONSTANTS.BATTLE_PHASE_TURN_HERO_END:
        return 'Hero - end';
        break;
      case CONSTANTS.BATTLE_PHASE_TURN_ENEMY_START:
        return 'Enemy - begin';
        break;
      case CONSTANTS.BATTLE_PHASE_TURN_ENEMY_END:
        return 'Enemy - end';
        break;
    }
  }
}

const actions = {
  gameStart({ commit }) {
    commit(types.GAME_START);
    commit(types.ROUND_START);
  },

  gameEnd({ commit }) {
    commit(types.GAME_STOP);
  },

  actionFight({ commit, state }) {

  },
}

const mutations = {
  [types.GAME_START] (state) {
    state.status = CONSTANTS.GAME_STATUS_ONGOING;
    state.level = 1;
    state.hero = new Hero();
    state.battlePhase = (Math.random(2) > 1) ? CONSTANTS.BATTLE_PHASE_TURN_HERO_START : CONSTANTS.BATTLE_PHASE_TURN_ENEMY_START;
  },

  [types.GAME_STOP] (state) {
    state.status = CONSTANTS.GAME_STATUS_STOP
  },

  [types.BATTLE_NEXT_PHASE] (state, move = null) {

    // if (state.battlePhase == CONSTANTS.BATTLE_PHASE_TURN_HERO_START) {
    // }

    state.battlePhase = (state.battlePhase == CONSTANTS.BATTLE_PHASE_TURN_ENEMY_END) ? CONSTANTS.BATTLE_PHASE_TURN_HERO_START : state.battlePhase++;
  },

  [types.ROUND_START] (state) {
    state.enemies = getEnemies(state.level)
  },

  [types.ROUND_COMPLETE] (state) {
    state.level++;
    state.heroTurn = !state.heroTurn;
  }
}

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
}

