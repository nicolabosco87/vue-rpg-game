import * as types from '../mutation-types';
import * as CONSTANTS from '../../constants';
import {getEnemies, Hero} from "../models/entities";


const PHASE_DURATION = 3000;


const state = {
  status: CONSTANTS.GAME_STATUS_STOP,
  level: 1,
  enemies: [],
  hero: null,
  battlePhase: 1,
  messages: [],
}

const getters = {
  gameState: state => state.status,
  gameOnGoing: state => state.status == CONSTANTS.GAME_STATUS_ONGOING,
  heroInfo: state => state.hero,
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
  },
  messages: state => state.messages,
}

const actions = {
  gameStart({ dispatch, commit, state }) {

    commit(types.MESSAGES_EMPTY)
    commit(types.GAME_START)
    commit(types.ROUND_START)
    commit(types.BATTLE_NEXT_PHASE)

    if (state.battlePhase != CONSTANTS.BATTLE_PHASE_TURN_HERO_START ) {
      setTimeout(() => dispatch('battlePhase'), PHASE_DURATION);
    }
  },

  gameEnd({ commit }) {
    commit(types.GAME_END);
  },

  battlePhase({ commit, state, dispatch }, move = null) {
    commit(types.MESSAGES_EMPTY);

    if (state.status != CONSTANTS.GAME_STATUS_ONGOING)
      return;

    commit(types.BATTLE_NEXT_PHASE, move);

    console.log("HERO STATUS", state.hero.status);

    if (state.hero.status == CONSTANTS.ENTITY_STATUS_DEAD) {
      commit(types.GAME_END);
      // setTimeout(() => dispatch('gameEnd'), 0);
      return;
    }

    if (state.enemies.length == 0 && state.hero.status != CONSTANTS.ENTITY_STATUS_DEAD) {
      commit(types.ROUND_COMPLETE);
      setTimeout(() => dispatch('nextRound'), PHASE_DURATION);
      return;
    }

    if (state.battlePhase != CONSTANTS.BATTLE_PHASE_TURN_HERO_START && state.hero.status != CONSTANTS.ENTITY_STATUS_DEAD ) {
      setTimeout(() => dispatch('battlePhase'), PHASE_DURATION);
    }
  },

  nextRound({commit, state, dispatch}) {
    commit(types.ROUND_START);

    if (state.battlePhase != CONSTANTS.BATTLE_PHASE_TURN_HERO_START ) {
      setTimeout(() => dispatch('battlePhase'), PHASE_DURATION);
    }
  }

}

const mutations = {
  [types.GAME_START] (state) {
    state.status = CONSTANTS.GAME_STATUS_ONGOING;
    state.level = 1;
    state.hero = new Hero();

    let newState = (Math.random()*2 > 1) ? CONSTANTS.BATTLE_PHASE_TURN_HERO_END : CONSTANTS.BATTLE_PHASE_TURN_ENEMY_END;
    state.battlePhase = newState;
  },

  [types.GAME_STOP] (state) {
    state.status = CONSTANTS.GAME_STATUS_STOP
  },

  [types.GAME_END] (state) {
    state.status = CONSTANTS.GAME_STATUS_END
  },

  [types.BATTLE_NEXT_PHASE] (state, move = null) {

    state.battlePhase = (state.battlePhase == CONSTANTS.BATTLE_PHASE_TURN_ENEMY_END) ? CONSTANTS.BATTLE_PHASE_TURN_HERO_START : state.battlePhase + 1;

    console.log("BATTLE_NEXT_PHASE", state);

    switch (state.battlePhase) {
      case CONSTANTS.BATTLE_PHASE_TURN_HERO_START:
        //waiting user choice
        state.messages.push('It\'s your turn!');
        break;

      case CONSTANTS.BATTLE_PHASE_TURN_HERO_END:

        if (move && move == CONSTANTS.MOVE_ATTACK) {
          let damage = state.hero.getAttack();
          state.enemies[0].doDamage(damage);
          state.messages.push('You have attacked a '+state.enemies[0].name+' with '+damage+' Damage.');
        }

        if (move && move == CONSTANTS.MOVE_FIREBOLT) {
          let damage = state.hero.getAttack() / 3;
          for (let e of state.enemies) {
            e.doDamage(damage);
          }
          state.messages.push('You have launched all your enemies with '+damage+' Damage for everyone.');
        }

        for (let e of state.enemies) {
          if (e.status == CONSTANTS.ENTITY_STATUS_DEAD) {
            state.messages.push('You have killed a '+e.name+'.');
            state.enemies = state.enemies.filter(el => el !== e);
          }
        }
        break;

      case CONSTANTS.BATTLE_PHASE_TURN_ENEMY_START:
        state.messages.push("The enemy is ready to attack!");
        break;

      case CONSTANTS.BATTLE_PHASE_TURN_ENEMY_END:
        for (let e of state.enemies) {
          let damage = e.getAttack();
          state.messages.push("Getted "+damage+" from "+e.name+'.');
          state.hero.doDamage(damage);
        }
        break;
    }

  },

  [types.ROUND_START] (state) {
    state.enemies = getEnemies(state.level);
    state.messages.push("Some enemy is approaching");
  },

  [types.ROUND_COMPLETE] (state) {
    state.level++;
    state.messages.push("You have defeated your enemies!");
  },

  [types.MESSAGES_ADD] (state, message) {
    state.messages.push(message);
  },

  [types.MESSAGES_EMPTY] (state) {
    state.messages = [];
  }
}

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
}

