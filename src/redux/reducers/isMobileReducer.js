export function isMobileReducer(state = {}, action) {
  switch (action.type) {
    case "IS_MOBILE": {
      const { isMobile } = action;
      return { ...state, isMobile };
    }
    default:
      return state;
  }
}

export const isMobile = (state) => state.isMobile.isMobile;
