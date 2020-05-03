import Phaser from "phaser";
import { TOILET_PAPER, CELL, VIRUS } from "../utils/const";
import {
  scaleImgToGameH,
  getImageSize,
  countSizeToGameH,
} from "../utils/helpers";

export const addToiletPaper = (context) => {
  const centerX = context.cameras.main.width / 2;
  const bottom = context.cameras.main.height;
  context.toiletPaper = context.add
    .sprite(centerX, bottom - countSizeToGameH(8, context), TOILET_PAPER)
    .setScale(scaleImgToGameH(15, TOILET_PAPER, context))
    .setDepth(1);
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

  if (characterName === VIRUS) {
    character.isVirus = true;
  } else {
    character.isVirus = false;
    character.setDepth(1);
  }
  context.charactersGroup.add(character);
  character.setVelocityY(50).setScale(characterScale);
};

export const addRandomCharacter = (context) => {
  const rand = Phaser.Math.Between(0, 100);
  rand > 10 ? addCharacter(VIRUS, context) : addCharacter(CELL, context);
};
