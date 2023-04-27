import Phaser from './lib/phaser.js'
import Intro from './scenes/Intro.js';
export default new Phaser.Game({
     type: Phaser.AUTO,
     width: 800,
     height: 600,
     scene: Intro,
})