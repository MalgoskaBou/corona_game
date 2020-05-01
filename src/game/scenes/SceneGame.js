import Phaser from "phaser";
import {
  BULLET,
  TOILET_PAPER,
  VIRUS,
  CELL,
  MOVE_SPEED,
  CELL_BCK,
  CELLS_BOTTOM,
  CELL_ANIMATION,
  SHOOT_AUDIO,
  VIRUS_AUDIO,
  CELL_AUDIO,
  CELL_HOME_AUDIO,
  FIRE_ANIMATION_KEY,
  CELL_ANIMATION_KEY,
} from "../utils/const";
import BulletsGroup from "../gameElements/Bullets";
import { addPointsText, updatePoints } from "../gameElements/points";
import { addRandomCharacter, addToiletPaper } from "../gameElements/characters";
import { addBckTiles, addBottomTiles } from "../gameElements/backgroundTiles";
import { fireBullet } from "../gameElements/shooting";
import { loadAnimation, scaleImgToGameH, animComplete } from "../utils/helpers";
import { addEvents } from "../gameElements/events";
export default class SceneGame extends Phaser.Scene {
  preload() {
    this.load.image(BULLET, "img/laserBlue02.png");
    this.load.image(VIRUS, "img/virus.png");
    this.load.image(CELL, "img/cell.png");
    this.load.image(CELL_BCK, "img/cellBck.jpg");
    this.load.image(CELLS_BOTTOM, "img/cells_bottom.png");
    this.load.spritesheet(TOILET_PAPER, "img/toilet_paper.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
    this.load.spritesheet(CELL_ANIMATION, "img/cell_animation.png", {
      frameWidth: 300,
      frameHeight: 300,
    });

    this.load.audio(SHOOT_AUDIO, "sounds/shot2.mp3");
    this.load.audio(VIRUS_AUDIO, "sounds/virus2.mp3");
    this.load.audio(CELL_AUDIO, "sounds/cell.mp3");
    this.load.audio(CELL_HOME_AUDIO, "sounds/cell_home.mp3");

    this.cursor = this.input.keyboard.createCursorKeys();
  }

  create() {
    addBckTiles(0.3, CELL_BCK, this);
    addBottomTiles(1, CELLS_BOTTOM, this);

    this.bulletGroup = new BulletsGroup(this);
    this.charactersGroup = this.physics.add.group();

    addRandomCharacter(this);
    addPointsText(this);

    loadAnimation(TOILET_PAPER, FIRE_ANIMATION_KEY, this);
    addToiletPaper(this);

    loadAnimation(CELL_ANIMATION, CELL_ANIMATION_KEY, this);

    addEvents(this);

    this.shoot_audio = this.sound.add(SHOOT_AUDIO);
    this.virus_audio = this.sound.add(VIRUS_AUDIO);
    this.cell_audio = this.sound.add(CELL_AUDIO);
    this.cell_home_audio = this.sound.add(CELL_HOME_AUDIO);
  }

  update() {
    this.inputKeys.forEach((key) => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        fireBullet(this);
      }
    });

    this.charactersGroup.children.iterate((child) => {
      if (child?.y > this.cameras.main.height - child?.displayWidth) {
        if (!child.isVirus) {
          updatePoints(this);
          this.cell_home_audio.play();
          this.cellAnimation = this.add
            .sprite(child.x, child.y, CELL_ANIMATION)
            .setOrigin(0)
            .setDepth(1)
            .setScale(scaleImgToGameH(10, CELL_ANIMATION, this));
          this.cellAnimation.on(
            "animationcomplete",
            (animation, frame) =>
              animComplete(animation, frame, this.cellAnimation, this),
            this
          );
          this.cellAnimation.play(CELL_ANIMATION_KEY);
        }
        child.destroy();
      }
    });

    if (
      this.cursor.left.isDown &&
      this.toiletPaper.x > this.toiletPaper.displayWidth / 2
    ) {
      this.toiletPaper.x -= MOVE_SPEED;
    }
    if (
      this.cursor.right.isDown &&
      this.toiletPaper.x <
        this.cameras.main.width - this.toiletPaper.displayWidth / 2
    ) {
      this.toiletPaper.x += MOVE_SPEED;
    }
  }
}
