import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
    hero = null
    cursors = null;
    rocks = null;
    lasers = null;
    nextShoot = 0;
    constructor() {
        super('game');
    }

    create() {
        this.hero = this.physics.add.sprite(400, 550, 'ship');
        this.cursors = this.input.keyboard.createCursorKeys()
        this.spawnEnemy();
    }

    spawnEnemy() {

        const position = Phaser.Math.Between(0,800);
        const speed = Phaser.Math.Between(200,400);
        const rock = this.physics.add.sprite(position, -50, "rock");
        rock.setVelocity(0, speed);

        if(!this.rocks) {
            this.rocks = this.add.group();
            this.physics.add.collider(this.hero, this.rocks, function (hero, rock) {
                hero.scene.rocks.remove(rock, true, true);
                hero.setVelocity(0,0)
            });     
        }
        this.rocks.add(rock);

        const delay = Phaser.Math.Between(500,5000);
        this.time.delayedCall(delay, this.spawnEnemy, {}, this); 

    }

    update(t, dt) {
        if (this.cursors.left.isDown) this.hero.x -= 5;
		if (this.cursors.right.isDown) this.hero.x += 5;
        if (this.cursors.up.isDown) this.hero.y -= 5;
		if (this.cursors.down.isDown) this.hero.y += 5;
        if (this.cursors.space.isDown) this.fireLaser();
    }

    fireLaser() {
        if(this.nextShoot > this.time.now) return;
        this.nextShoot = this.time.now + 250;
 
        const laser = this.physics.add.sprite(this.hero.x, this.hero.y, "laser");
        laser.setVelocity(0, -500);

        if(!this.lasers) {
            this.lasers = this.add.group();
            this.physics.add.collider(this.lasers, this.rocks, function (laser, rock) {
                laser.scene.rocks.remove(rock, true, true);
                laser.scene.lasers.remove(laser, true, true);
            });     
        }
        this.lasers.add(laser);
    }
    
    preload() {
        this.load.image('ship', 'assets/sprites/player_ship.png');
        this.load.image('rock', 'assets/sprites/rock1.png');
        this.load.image('laser', 'assets/sprites/player_laser.png')
    }

}

