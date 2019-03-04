import Entity from './Entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprLaserEnemy0");
    this.body.setVelocityY(200);
  }
}
