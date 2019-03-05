import CONST from '../data/const';
import ScrollingBackGround from '../component/ScrollingBackGround';
import LocalDatabase from '../component/LocalDatabase';

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super('SceneMainMenu');
  }

  init(){
    window.global.height = this.game.config.height;
    window.global.width = this.game.config.width;
    this.dbLocal = new LocalDatabase();
  }

  preload(){
    // Load assets
    // TODO: CREATE PRELOAD LOADING
    this.load.image("sprBtnPlay", "assets/sprBtnPlay.png");
    this.load.image("sprBtnPlayHover", "assets/sprBtnPlayHover.png");
    this.load.image("sprBtnPlayDown", "assets/sprBtnPlayDown.png");
    this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
    this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
    this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");
    this.load.image('sprBg0', 'assets/sprBg0.png');
    this.load.image('sprBg1', 'assets/sprBg1.png');

    this.load.audio("sndBtnOver", "assets/audio/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "assets/audio/sndBtnDown.wav");

    this.load.audio("sndExplode0", "assets/audio/sndExplode0.wav");
    this.load.audio("sndExplode1", "assets/audio/sndExplode1.wav");
    this.load.audio("sndLaser", "assets/audio/sndLaser.wav");
    this.load.audio("sndLaser0", ["assets/audio/sndLaser0.mp3", "assets/audio/sndLaser0.ogg"]);
    // this.load.audio("bgm", ["assets/audio/BGM_DCannon.mp3", "assets/audio/BGM_DCannon.ogg"]);
    this.load.audio("bgm", ["assets/audio/bgm_bit.mp3", "assets/audio/bgm_bit.ogg"]);
  }

  create(){
    console.log("From SceneMainMenu");
    this.add.text(2, this.game.config.height - 2,
      "Play Control\nMove: [A (Left), D (Right)]\nShoot: [Space]\n" + window.global.signature)
      .setOrigin(0, 1);

    let localScore = this.dbLocal.getData('localScore');
    if (localScore){
      this.add.text(window.global.width/2, 235, localScore, {
        fontFamily: 'monospace',
        fontSize: CONST.fonts.big,
        fontStyle: 'bold',
        color: CONST.colors.white,
        align: 'center'
      }).setOrigin(0.5);
    }

    // this.scene.start('SceneMain');
    if (window.global.bgmInstance === undefined){
      this.bgm = this.sound.add("bgm", {loop: true, volume: 0.5});
      this.bgm.play();
      window.global.bgmInstance = this.bgm;
      console.log("Play BGM");
    }

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown')
    };
    this.btnPlay = this.add.sprite(
      window.global.width / 2,
      (window.global.height / 2) + 100,
      'sprBtnPlay'
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on('pointerover', this.onHover.bind(this));
    this.btnPlay.on('pointerout', this.onOut.bind(this));
    this.btnPlay.on('pointerdown', this.onClick.bind(this));
    this.btnPlay.on('pointerup', () => {
      this.btnPlay.setTexture('sprBtnPlayHover');
    });
    this.title = this.add.text(window.global.width * 0.5, 128, "SPACE SHOOTER", {
      fontFamily: 'monospace',
      fontSize: CONST.fonts.title,
      fontStyle: 'bold',
      color: CONST.colors.white,
      align: 'center'
    });
    this.title.setOrigin(0.5);

    this.backgrounds = [];
    for (let i = 0; i < 5; i++) {
      let keys = ["sprBg0", "sprBg1"];
      let key = keys[Phaser.Math.Between(0, keys.length - 1)];
      let bg = new ScrollingBackGround(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  onClick(){
    this.btnPlay.setTexture('sprBtnPlayDown');
    this.sfx.btnDown.play();
    this.time.addEvent({
      delay: 90,
      callback: () => {
        // console.log("PLAY");
        this.scene.start('SceneMain');
      },
      loop: false
    });
  }

  onOut(){
    this.btnPlay.setTexture('sprBtnPlay');
  }

  onHover(){
    this.btnPlay.setTexture('sprBtnPlayHover');
    this.sfx.btnOver.play();
  }

  update(){
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  } // End of update

} // End of class
