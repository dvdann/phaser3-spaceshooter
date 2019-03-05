import CONST from '../data/const';
import Player from '../component/Player';
import ChaserShip from '../component/ChaserShip';
import GunShip from '../component/GunShip';
import CarrierShip from '../component/CarrierShip';
import ScrollingBackGround from '../component/ScrollingBackGround';

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload(){
    // Load images
    this.load.spritesheet('rplrocket', 'assets/rplrocket.png', {
      frameWidth: 35,
      frameHeight: 55
    });
    this.load.spritesheet('gunship', 'assets/gunship.png', {
      frameWidth: 39,
      frameHeight: 33
    });
    this.load.spritesheet('carriership', 'assets/carriership.png', {
      frameWidth: 30,
      frameHeight: 37
    });
    this.load.spritesheet('chaser', 'assets/chaser.png', {
      frameWidth: 128,
      frameHeight: 128
    });

    this.load.spritesheet("sprExplosion", "assets/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("sprEnemy0", "assets/sprEnemy0.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprEnemy1", "assets/sprEnemy1.png");
    this.load.spritesheet("sprEnemy2", "assets/sprEnemy2.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprLaserEnemy0", "assets/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "assets/sprLaserPlayer.png");
    this.load.image("sprLaserENew", "assets/sprLaserEnemyn.png");
    this.load.image("sprLaserPNew", "assets/sprLaserPlayern.png");
    this.load.spritesheet("sprPlayer", "assets/sprPlayer.png", {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create(){
    // TODO: ADD TINT IF DAMAGED
    // Define our objects
    console.log("From SceneMain");
    // this.add.text(window.global.width/2, this.game.config.height - 110, "Title", {fontSize: CONST.fonts.title});
    // this.add.text(window.global.width/2, this.game.config.height - 75, "Normal", {fontSize: CONST.fonts.normal});
    // this.add.text(window.global.width/2, this.game.config.height - 50, "Small", {fontSize: CONST.fonts.small});
    // this.add.text(window.global.width/2, this.game.config.height - 25, "Tiny", {fontSize: CONST.fonts.tiny});

    this.anims.create({
      key: 'rplrocket',
      frames: this.anims.generateFrameNumbers('rplrocket'),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'gunship',
      frames: this.anims.generateFrameNumbers('gunship'),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'carriership',
      frames: this.anims.generateFrameNumbers('carriership'),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'chaser',
      frames: this.anims.generateFrameNumbers('chaser'),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });

    // Setting sound that can be called dynamic with index
    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: [
        this.sound.add("sndLaser", {volume: 0.5}),
        this.sound.add("sndLaser0", {volume: 0.5})
      ]
    };
    // this.sfx.laser.play();

    this.backgrounds = [];
    for (let i = 0; i < 5; i++) { // creat five scrolling backgrounds
      let keys = ["sprBg0", "sprBg1"];
      let key = keys[Phaser.Math.Between(0, keys.length - 1)];
      let bg = new ScrollingBackGround(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      window.global.width/2,
      window.global.height - 64,
      'rplrocket'
    );
    this.player.play('rplrocket', true); // Play animation
    this.player.body.setSize(
      this.player.displayWidth/2,
      this.player.displayHeight
    );

    // this.eChaser = new ChaserShip(
    //   this,
    //   window.global.width/2,
    //   50
    // );
    // console.log("objType: " + this.eChaser.getData('type'));
    // this.eChaser.damaged(10);
    // console.log("HP: " + this.eChaser.remainHP());
    //
    // this.eGunShip = new GunShip(
    //   this,
    //   window.global.width/2 - 100,
    //   50
    // );
    // console.log("objType: " + this.eGunShip.getData('type'));
    // console.log("HP: " + this.eGunShip.remainHP());
    //
    //
    // this.eCarrierShip = new CarrierShip(
    //   this,
    //   window.global.width/2 + 100,
    //   50
    // );
    // console.log("objType: " + this.eCarrierShip.getData('type'));
    // this.eCarrierShip.setHP(5);
    // console.log("HP: " + this.eCarrierShip.remainHP());

    // Define Player control
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Define Group of GameObjects
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();


    this.physics.add.collider(this.playerLasers, this.enemies, (pLaser, enemy) => {
      if (enemy){
        pLaser.destroy();
        if (this.isEnemyType(enemy, "ChaserShip") || this.isEnemyType(enemy, "CarrierShip")){
          enemy.damaged();
          // console.log("Hayolo: " + enemy.getData('type'));
        }
        else {
          this.scoreAdd();
          enemy.explode(true);
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      // console.log("Player and Enemy collided!");
      if (!player.isDead() && !enemy.isDead()){
        player.onDestroy();
        player.explode(false);
        player.setData('isDead', true);
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, eLaser) => {
      if (!player.isDead()){
        player.onDestroy();
        player.explode(false);
        eLaser.destroy();
      }
    });

    this.time.addEvent({
      delay: Phaser.Math.Between(800, 1000),
      callback: this.createEnemy.bind(this),
      loop: true
    });

    this.scoreText = this.add.text(16, 16, "0", {
      fontFamily: 'monospace',
      fontSize: CONST.fonts.big,
      fontStyle: 'bold',
      color: CONST.colors.white,
      align: 'left',
      stroke: CONST.colors.purple,
			strokeThickness: 2
    });
    this.scoreText.setDepth(10);
    this.scoreReset();

  } // End of create

  createEnemy(){
    let enemy = null;
    if (Phaser.Math.Between(0, 10) >= 3) {
      enemy = new GunShip(
        this,
        Phaser.Math.Between(0, window.global.height),
        0
      );
    }
    else if (Phaser.Math.Between(0, 10) >= 5) {
      if (this.getEnemiesByType('ChaserShip').length < 5){
        enemy = new ChaserShip(
          this,
          Phaser.Math.Between(0, window.global.height),
          0
        );
        enemy.setHP(2);
        enemy.body.setImmovable();
      } // End of getEnemiesByType
    }
    else {
      enemy = new CarrierShip(
        this,
        Phaser.Math.Between(0, window.global.height),
        0
      );
      enemy.setHP(3);
      enemy.setSpeed(Phaser.Math.Between(75,175));
      enemy.body.setImmovable();
    }
    if (enemy !== null){
      let isChoosen = (this.isEnemyType(enemy, 'CarrierShip') || this.isEnemyType(enemy, 'GunShip'));
      let scaleRand = isChoosen ? 1 : Phaser.Math.Between(10, 20) * 0.1;
      // let scaleRand = isCarrier ? Phaser.Math.Between(17, 20) * 0.1 : Phaser.Math.Between(10, 20) * 0.1;
      // console.log(isCarrier+ " -> " +scaleRand);
      enemy.setScale(scaleRand);
      this.enemies.add(enemy);
    }
  }

  getEnemiesByType(type){
    let enemiesWithType = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') == type){
        enemiesWithType.push(enemy);
      }
    }
    return enemiesWithType;
  }

  isEnemyType(enemy, type){
    let isType = false;
    if (enemy.getData('type') == type){
      isType = true;
    }
    return isType;
  }

  scoreAdd(value = 1){
    window.global.score += value;
    this.scoreText.setText(window.global.score);
  }

  scoreReset(){
    window.global.score = 0;
    this.scoreText.setText(window.global.score);
  }

  update(){
    this.player.update();
    if (!this.player.isDead()){
      // Player control
      if (this.keyA.isDown || this.cursors.left.isDown){
        this.player.moveLeft();
      }
      else if (this.keyD.isDown || this.cursors.right.isDown){
        this.player.moveRight();
      }
      // if (this.keyW.isDown){
      //   this.player.moveUp();
      // }
      // else if (this.keyS.isDown){
      //   this.player.moveDown();
      // }
      // Player shoot
      if (this.keySpace.isDown && !this.player.isDead()) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    } // End of not isDead

    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];
      enemy.update();
      if (enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > window.global.height + enemy.displayHeight){
        this.enemies.remove(enemy);
        if (enemy.onDestroy !== undefined){
          enemy.onDestroy();
        }
        else {
          enemy.destroy();
        }
      }
    } // End of looping enemies group

    for (let i = 0; i < this.enemyLasers.getChildren().length; i++) {
      let laser = this.enemyLasers.getChildren()[i];
      if (laser.y > window.global.height){
        this.enemyLasers.remove(laser);
        laser.destroy();
      }
    } // End of looping enemyLasers group

    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }

  } // End of update

}
