import Phaser from "phaser";
import SceneMain from "./scenes/mainScene";
import SceneGame from "./scenes/SceneGame";
import { isMobileDevice } from "./utils/isMobile";

const dpr = window.devicePixelRatio;
const fullHeight = window.innerHeight * dpr;
const fullWidth = window.innerWidth * dpr;

export const config = {
  isMobile: isMobileDevice(),
  width: isMobileDevice() ? fullWidth : 800,
  height: fullHeight,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
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
