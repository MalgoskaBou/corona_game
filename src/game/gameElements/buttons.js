import { ARROW_BTN, FIRE_BTN } from "../utils/const";
import { fireBullet } from "../gameElements/shooting";
import { scaleImgToGameH, countSizeToGameH } from "../utils/helpers";

export const addButtons = (isPressed, context) => {
  const scaleToGame = scaleImgToGameH(9, FIRE_BTN, context);

  const fire = context.add
    .image(
      context.cameras.main.width / 2,
      context.cameras.main.height,
      FIRE_BTN
    )
    .setOrigin(0.5, 1)
    .setScale(scaleToGame)
    .setDepth(1);

  const arrowR = context.add
    .image(
      context.cameras.main.width / 2 + countSizeToGameH(10, context),
      context.cameras.main.height,
      ARROW_BTN
    )
    .setOrigin(0, 1)
    .setScale(scaleToGame)
    .setDepth(1);

  const arrowL = context.add
    .image(
      context.cameras.main.width / 2 - countSizeToGameH(10, context),
      context.cameras.main.height,
      ARROW_BTN
    )
    .setOrigin(1, 1)
    .setScale(scaleToGame)
    .setDepth(1)
    .setFlipX(true);

  arrowR.setInteractive().on("pointerdown", () => (isPressed.right = true));
  arrowL.setInteractive().on("pointerdown", () => (isPressed.left = true));

  arrowR.setInteractive().on("pointerup", () => (isPressed.right = false));
  arrowL.setInteractive().on("pointerup", () => (isPressed.left = false));

  fire.setInteractive().on("pointerdown", () => fireBullet(context));
};
