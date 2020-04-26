import Phaser from "phaser";
import {
  BULLET,
  TOILET_PAPER,
  VIRUS,
  CELL,
  MOVE_SPEED,
  CELL_BCK,
} from "../utils/const";
import BulletsGroup from "../utils/Bullets";
import { addPointsText, updatePoints } from "../utils/points";
import {
  addRandomCharacter,
  addToiletPaper,
  loadToiletAnimation,
} from "../utils/characters";
import { addBckTiles } from "../utils/backgroundTiles";

export default class SceneGame extends Phaser.Scene {
  preload() {
    this.load.image(BULLET, "img/laserBlue02.png");
    this.load.image(VIRUS, "img/virus.png");
    this.load.image(CELL, "img/cell.png");
    this.load.image(CELL_BCK, "img/cellBck.jpg");
    this.load.spritesheet(TOILET_PAPER, "img/toilet_paper.png", {
      frameWidth: 300,
      frameHeight: 300,
    });

    this.cursor = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.points = 0;

    addBckTiles(0.3, CELL_BCK, this);
    this.bulletGroup = new BulletsGroup(this);
    this.charactersGroup = this.physics.add.group();

    addRandomCharacter(this);
    addPointsText(this);
    this.addEvents();

    loadToiletAnimation(this);
    addToiletPaper(this);

    this.physics.add.collider(
      this.charactersGroup,
      this.bulletGroup,
      this.hitCharacter,
      null,
      this
    );
  }

  update() {
    this.inputKeys.forEach((key) => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.fireBullet();
      }
    });

    this.charactersGroup.children.iterate((child) => {
      if (child?.y > this.cameras.main.height) {
        child.destroy();
        if (!child.isVirus) {
          updatePoints(this);
        }
      }
    });

    if (this.cursor.left.isDown) {
      this.toiletPaper.x -= MOVE_SPEED;
    }
    if (this.cursor.right.isDown) {
      this.toiletPaper.x += MOVE_SPEED;
    }
  }

  hitCharacter(character, bullet) {
    if (character.isVirus) {
      updatePoints(this);
    }
    character.destroy();
    bullet.setActive(false);
    bullet.setVisible(false);
    bullet.body.reset(0, 0);
  }

  fireBullet() {
    this.bulletGroup.fireBullet(this.toiletPaper.x, this.toiletPaper.y - 20);
    this.toiletPaper.play("fire");
  }

  addEvents() {
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];

    this.timer = this.time.addEvent({
      delay: 3000,
      callback: () => addRandomCharacter(this),
      callbackScope: this,
      loop: true,
    });
  }
}
