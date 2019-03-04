import Entity from './Entity';

export default class Enemy extends Entity {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key, type);
    this.setSpeed(Phaser.Math.Between(50, 100));
    this.setHP(1); // Default value
    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
  }

  setSpeed(value){
    this.body.setVelocityY(value);
  }

  setSpeedXY(x, y){
    this.body.setVelocity(x, y);
  }

  damaged(value){
    if (!this.isDead()){
      let currHP = this.remainHP();
      value = value === undefined ? 1 : value;
      this.setHP(currHP-value);
      if (this.remainHP() <= 0){
        this.setHP(0);
        this.setData('isDead', true);
        this.destroy();
      }
    }
  }

  remainHP(){
    return this.getData('health');
  }

  setHP(value){
    this.setData('health', value);
  }
  
}
