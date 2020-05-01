import Phaser from "phaser";
import { addRandomCharacter } from "./characters";
import { hitCharacter } from "./shooting";

export const addEvents = (context) => {
  context.inputKeys = [
    context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
  ];

  context.timer = context.time.addEvent({
    delay: 2000,
    callback: () => addRandomCharacter(context),
    callbackScope: context,
    loop: true,
  });

  context.physics.add.collider(
    context.charactersGroup,
    context.bulletGroup,
    (character, bullet) => hitCharacter(character, bullet, context),
    null,
    context
  );
};
