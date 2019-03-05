import 'phaser';
import SceneMain from './scenes/SceneMain';
import SceneMainMenu from './scenes/SceneMainMenu';
import SceneGameOver from './scenes/SceneGameOver';

let game;
let scenes = [];
scenes.push(SceneMainMenu);
scenes.push(SceneMain);
scenes.push(SceneGameOver);

window.onload = () => {
  let config = {
      type: Phaser.AUTO,
      parent: 'phaser-game',
      width: 480,
      height: 640,
      backgroundColor: 'black',
      pixelArt: true,
      physics: {
    		default: 'arcade',
    		arcade: {
    			gravity: {x: 0, y: 0},
    			debug: false
    		}
      },
      scene: scenes
  };
  game = new Phaser.Game(config);
};

window.global = {
  signature: '@RPLGDC2019 | Arsyel - Witsq - Anon',
  score: 0
};
