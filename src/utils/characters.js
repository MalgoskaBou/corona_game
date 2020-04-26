import Phaser from "phaser";
import { TOILET_PAPER, CELL, VIRUS } from "./const";
import { scaleImgToGameH, getImageSize } from "./helpers";

export const addToiletPaper = (context) => {
  const centerX = context.cameras.main.width / 2;
  const bottom = context.cameras.main.height;
  context.toiletPaper = context.add
    .sprite(centerX, bottom - 90, TOILET_PAPER)
    .setScale(scaleImgToGameH(15, TOILET_PAPER, context));
};

export const loadToiletAnimation = (context) => {
  const config = {
    key: "fire",
    frames: context.anims.generateFrameNumbers(TOILET_PAPER),
    frameRate: 14,
    repeat: 0,
  };

  context.anims.create(config);
};

const addCharacter = (characterName, context) => {
  const characterScale =
    characterName === VIRUS
      ? scaleImgToGameH(12, VIRUS, context)
      : scaleImgToGameH(10, CELL, context);

  const characterWidth =
    getImageSize(characterName, context).width * characterScale;

  const randomXPos = Phaser.Math.Between(
    0,
    context.cameras.main.width - characterWidth
  );

  const character = context.physics.add
    .image(randomXPos, 0, characterName)
    .setOrigin(0);

  characterName === VIRUS
    ? (character.isVirus = true)
    : (character.isVirus = false);
  context.charactersGroup.add(character);
  character.setVelocityY(50).setScale(characterScale);
};

export const addRandomCharacter = (context) => {
  const rand = Phaser.Math.Between(0, 100);
  rand > 50 ? addCharacter(VIRUS, context) : addCharacter(CELL, context);
};
