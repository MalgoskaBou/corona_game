export function pointReducer(state = {}, action) {
  switch (action.type) {
    case "UPDATE_POINTS": {
      const { points } = action;
      return { ...state, points: points + 1 };
    }
    default:
      return state;
  }
}

export const getPoints = (state) => state.totalPoints.points;
