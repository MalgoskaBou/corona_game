import Phaser from "phaser";
import SceneMain from "./scenes/mainScene";
import SceneGame from "./scenes/SceneGame";
import { isMobileDevice } from "./utils/isMobile";

export const config = {
  isMobile: isMobileDevice(),
  width: isMobileDevice() ? "100%" : "50%",
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
