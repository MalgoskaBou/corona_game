import Phaser from "phaser";
import SceneMain from "./scenes/mainScene";
import SceneGame from "./scenes/SceneGame";
import { isMobileDevice } from "./utils/isMobile";

const dpr = window.devicePixelRatio;

export const config = {
  isMobile: isMobileDevice(),
  width: isMobileDevice() ? window.innerWidth * dpr : 800,
  height: window.innerHeight * dpr,
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
