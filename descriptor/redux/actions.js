import {
  SET_DESCRIPTORS,
  SET_DESCRIPTORS_REFERENCES,
  SET_LOADING_DESCRIPTORS,
  UPDATE_REFERENCE_ID,
  CLEAR_DESCRIPTORS,
  SET_MODULE_ID
} from "./types";

export const setDescriptors = descriptors => ({
  type: SET_DESCRIPTORS,
  descriptors: descriptors
});

export const setDescriptorReferences = descriptorReferences => ({
  type: SET_DESCRIPTORS_REFERENCES,
  descriptorReferences: descriptorReferences
});
export const setLoadingDescriptors = bool => ({
  type: SET_LOADING_DESCRIPTORS,
  isDescriptorsLoading: bool
});
export const setReferenceId = referenceId => ({
  type: UPDATE_REFERENCE_ID,
  referenceId: referenceId
});
export const clearDescriptors = () => ({
  type: CLEAR_DESCRIPTORS
});
export const setModuleId = moduleId => ({
  type: SET_MODULE_ID,
  moduleId: moduleId
});
