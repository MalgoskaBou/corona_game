import Phaser from "phaser";
import SceneMain from "./scenes/mainScene";

export const config = {
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,
  scene: [SceneMain],
};
