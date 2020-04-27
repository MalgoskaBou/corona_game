import { scaleTextToGameH } from "../utils/helpers";
import { store } from "../../redux/store";
import { updatePoints as updatePointsAction } from "../../redux/actions/updatePoints";

export const addPointsText = (context) => {
  context.pointsText = context.add.text(10, 10, "POINTS: 0", {
    color: "#000000",
    fontSize: scaleTextToGameH(30, context),
  });
};

export const updatePoints = (context) => {
  const { points } = store.getState();
  store.dispatch(updatePointsAction(points ?? 0));
  context.pointsText.setText(`POINTS: ${store.getState().points}`);
};
