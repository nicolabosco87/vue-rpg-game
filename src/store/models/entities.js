import * as CONSTANTS from '../../constants'


export class Entity {
  constructor(hp = 10, level = 1, baseAttack = 10) {
    this.id = new Date().getUTCMilliseconds();
    this.name = null;
    this.level = level;
    this.hp = hp;
    this.baseAttack = 10;
    this.status = CONSTANTS.ENTITY_STATUS_LIVE;
  }

  getAttack() {
    return this.baseAttack + this.baseAttack * Math.floor(this.level / 3);
  }

  isAlive() {
    return this.hp > 0;
  }

  doDamage(damage = 0) {
    this.hp-= damage;

    if (this.hp <= 0) {
      this.status = CONSTANTS.ENTITY_STATUS_DEAD;
    }
  }

}

export class Troll extends Entity {
  constructor(level) {
    let hp = 10 * Math.ceil(level / 2);
    super(hp, level);
    this.name = 'Troll';
  }
}

export class Demon extends Entity {
  constructor(level) {
    let hp = 15 * Math.ceil(level / 2);
    super(hp, level);
    this.name = 'Demon';
  }
}

export class Hero extends Entity {
  constructor() {
    super(100);
    this.name = 'Hero';
  }
}

export function getEnemies(level = 1) {

  let trolls = [], demons = [];

  let mostersLevel = (level % 3);

  trolls.push(new Troll(mostersLevel));
  if (level > 1) {
    trolls.push(new Troll(mostersLevel));
  }
  if (level > 2) {
    trolls.push(new Troll(mostersLevel));
  }
  if (level > 3) {
    demons.push(new Demon(mostersLevel));
  }

  return trolls.concat(demons);
}
