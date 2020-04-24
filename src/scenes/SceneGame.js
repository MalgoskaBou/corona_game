import Phaser from "phaser";
import { BULLET, TOILET_PAPER, VIRUS, CELL } from "../utils/const";

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, BULLET);
  }

  fire(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(-900);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

class BulletsGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 10,
      key: BULLET,
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(x, y) {
    const bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y);
    }
  }
}

export default class SceneGame extends Phaser.Scene {
  preload() {
    this.load.image(BULLET, "img/laserBlue02.png");
    this.load.image(TOILET_PAPER, "img/playerShip1_red.png");
    this.load.image(VIRUS, "img/coin.png");
    this.load.image(CELL, "img/flower.png");
  }

  create() {
    this.cameras.main.setBackgroundColor(0x1d1923);

    this.bulletGroup = new BulletsGroup(this);
    this.enemiesGroup = this.physics.add.group();

    this.addToiletPaper();
    this.addVirus();
    this.addEvents();

    this.physics.add.collider(
      this.enemiesGroup,
      this.bulletGroup,
      this.hitVirus,
      null,
      this
    );
  }

  hitVirus(enemy, bullet) {
    enemy.destroy();
    bullet.setActive(false);
    bullet.setVisible(false);
    bullet.body.reset(0, 0);
  }

  //TRZEBA zapobiec dodawaniu elementów na kwawedzi sceny i skalować zgodnie z wysokością sceny
  addVirus() {
    const centerX = Phaser.Math.Between(0, this.cameras.main.width);
    const top = 200;
    const bullet = this.physics.add.image(centerX, top, VIRUS);
    bullet.scale = 0.1;
    const size = { width: bullet.width / 10, height: bullet.height / 10 };
    console.log(size);
    this.enemiesGroup.add(bullet);
    bullet.setVelocityY(50);
  }

  addCells() {
    const centerX = Phaser.Math.Between(0, this.cameras.main.width);
    const top = 200;
    const cell = this.physics.add.image(centerX, top, CELL);
    cell.scale = 0.1;
    this.enemiesGroup.add(cell);
    cell.setVelocityY(50);
  }

  addToiletPaper() {
    const centerX = this.cameras.main.width / 2;
    const bottom = this.cameras.main.height;
    this.toiletPaper = this.add.image(centerX, bottom - 90, TOILET_PAPER);
  }

  addEvents() {
    this.input.on("pointermove", (pointer) => {
      this.toiletPaper.x = pointer.x;
    });

    this.input.on("pointerdown", (pointer) => {
      this.fireBullet();
    });

    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];

    this.time.addEvent({
      delay: 3000,
      callback: this.randomEnemies,
      callbackScope: this,
      loop: true,
    });
  }

  randomEnemies() {
    const rand = Phaser.Math.Between(0, 100);
    rand > 50 ? this.addVirus() : this.addCells();
  }

  fireBullet() {
    this.bulletGroup.fireBullet(this.toiletPaper.x, this.toiletPaper.y - 20);
  }

  update() {
    this.inputKeys.forEach((key) => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.fireBullet();
      }
    });

    this.enemiesGroup.children.iterate((child) => {
      if (child?.y > this.cameras.main.height) {
        child.destroy();
        console.log(this.enemiesGroup.children);
      }
    });
  }
}
