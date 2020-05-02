import { scaleTextToGameH } from "../utils/helpers";
import { store } from "../../redux/store";
import { updatePointsAction } from "../../redux/actions/updatePointsAction";
import { getPoints } from "../../redux/reducers/pointReducer";

export const addPointsText = (context) => {
  context.pointsText = context.add.text(10, 10, "POINTS: 0", {
    color: "#000000",
    fontSize: scaleTextToGameH(30, context),
  });
};

export const updatePoints = (context) => {
  store.dispatch(updatePointsAction(getPoints(store.getState()) ?? 0));
  context.pointsText.setText(`POINTS: ${getPoints(store.getState())}`);
};
