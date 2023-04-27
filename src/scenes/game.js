import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
    hero = null
    cursors = null;
    constructor() {
        super('game');
    }

    create() {
        this.hero = this.add.sprite(320, 200, 'ship');
        
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(t, dt) {
        if (this.cursors.left.isDown) this.hero.x -= 5;
		if (this.cursors.right.isDown) this.hero.x += 5;
        if (this.cursors.up.isDown) this.hero.y -= 5;
		if (this.cursors.down.isDown) this.hero.y += 5;
    }
    
    preload() {
        this.load.image('ship', 'assets/sprites/player_ship.png');
    }

}

