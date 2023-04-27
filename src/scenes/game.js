import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
    hero = null
    rock = null;
    cursors = null;
    constructor() {
        super('game');
    }

    create() {
        this.hero = this.physics.add.sprite(320, 200, 'ship');
        this.rock = this.physics.add.sprite(100, 100, "rock");
        this.cursors = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(this.hero, this.rock, function (hero, rock) {
            rock.alpha = 0.5;
        });                

    }

    update(t, dt) {
        if (this.cursors.left.isDown) this.hero.x -= 5;
		if (this.cursors.right.isDown) this.hero.x += 5;
        if (this.cursors.up.isDown) this.hero.y -= 5;
		if (this.cursors.down.isDown) this.hero.y += 5;
    }
    
    preload() {
        this.load.image('ship', 'assets/sprites/player_ship.png');
        this.load.image('rock', 'assets/sprites/rock1.png');
    }

}

