import Phaser from "phaser";
import SceneMain from "./scenes/mainScene";
import SceneGame from "./scenes/SceneGame";

export const config = {
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [SceneGame],
};
