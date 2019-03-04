import CONST from '../data/const';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super('SceneGameOver');
  }

  create(){
    this.title = this.add.text(window.global.width * 0.5, 64, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: CONST.fonts.title,
      fontStyle: 'bold',
      color: CONST.colors.white,
      align: 'center'
    });
    this.title.setOrigin(0.5);

    this.scoreLabel = this.add.text(window.global.width * 0.5, 128, "YOUR SCORE: 99", {
      fontFamily: 'monospace',
      fontSize: CONST.fonts.big,
      fontStyle: 'bold',
      color: CONST.colors.white,
      align: 'center'
    });
    this.scoreLabel.setOrigin(0.5);
    this.scoreLabel.setText("YOUR SCORE: " + this.getScore());

    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };
    this.btnRestart = this.add.sprite(
      window.global.width / 2,
      (window.global.height - 128),
      'sprBtnRestart'
    );
    this.btnRestart.setInteractive();
    this.btnRestart.on('pointerover', this.onHover.bind(this));
    this.btnRestart.on('pointerout', this.onOut.bind(this));
    this.btnRestart.on('pointerdown', this.onClick.bind(this));
    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('sprBtnRestartHover');
    });
  } // End of create

  getScore(){
    return window.global.score;
  }

  onClick(){
    this.btnRestart.setTexture('sprBtnRestartDown');
    this.sfx.btnDown.play();
    console.log("RESTART");
    this.scene.start('SceneMain');
    // this.time.addEvent({
    //   delay: 90,
    //   callback: () => {
    //     // this.scene.start('SceneMain');
    //   },
    //   loop: false
    // });
  }

  onOut(){
    this.btnRestart.setTexture('sprBtnRestart');
  }

  onHover(){
    this.btnRestart.setTexture('sprBtnRestartHover');
    this.sfx.btnOver.play();
  }
}
