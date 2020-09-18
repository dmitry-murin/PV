import {
  SET_MODULE_ID,
  SET_DESCRIPTORS,
  SET_DESCRIPTORS_REFERENCES,
  SET_LOADING_DESCRIPTORS,
  UPDATE_REFERENCE_ID,
  CLEAR_DESCRIPTORS
} from "./types";

const initialState = {
  moduleId: null,
  referenceId: null,
  isDescriptorsLoading: false,
  descriptors: [],
  descriptorReferences: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MODULE_ID:
      const { moduleId } = action;
      return { ...state, moduleId };
    case SET_DESCRIPTORS:
      const { descriptors } = action;
      return { ...state, descriptors };
    case SET_DESCRIPTORS_REFERENCES:
      const { descriptorReferences } = action;
      return { ...state, descriptorReferences };
    case SET_LOADING_DESCRIPTORS:
      const { isDescriptorsLoading } = action;
      return { ...state, isDescriptorsLoading };
    case UPDATE_REFERENCE_ID:
      const { referenceId } = action;
      return { ...state, referenceId };
    case CLEAR_DESCRIPTORS:
      return initialState;
    default:
      return state;
  }
}
