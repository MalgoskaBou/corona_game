import Phaser from "phaser";
import SceneMain from "./scenes/mainScene";
import SceneGame from "./scenes/SceneGame";
import { isMobileDevice } from "./utils/isMobile";
import { store } from "../redux/store";
import { isMobile } from "../redux/reducers/isMobileReducer";

const mobile = isMobile(store.getState());

export const config = {
  isMobile: mobile,
  width: mobile ? "100%" : 800,
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
