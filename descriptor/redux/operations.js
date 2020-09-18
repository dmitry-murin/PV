import {
  setDescriptors,
  setDescriptorReferences,
  setLoadingDescriptors,
  setReferenceId,
  clearDescriptors,
  setModuleId
} from "./actions";

import {
  descriptorApi,
  descriptorReferenceApi,
  saveDescriptorReferences
} from "../api";

const _setModuleId = moduleId => dispatch => {
  dispatch(setModuleId(moduleId));
};

const fechDescriptors = referenceId => (dispatch, getState) => {
  const { descriptor } = getState();
  if (descriptor.moduleId && descriptor.referenceId !== referenceId) {
    dispatch(setReferenceId(referenceId));
    dispatch(setLoadingDescriptors(true));
    const { descriptor: newDescriptor } = getState();
    Promise.all([
      getDescriptors(newDescriptor.moduleId, newDescriptor.referenceId),
      getDescriptorReference(newDescriptor.referenceId)
    ]).then(result => {
      dispatch(setDescriptors(result[0].items));
      dispatch(setDescriptorReferences(result[1].items));

      dispatch(setLoadingDescriptors(false));
    });
  }
};
const saveDescriptorReference = editRow => (dispatch, getState) => {
  const { descriptor } = getState();
  var list = [];
  for (let key in editRow) {
    let prop = descriptor.descriptors.find(x => "prop_" + x.id === key);
    if (prop) {
      let propId;

      if (
        descriptor.descriptorReferences &&
        Object.keys(descriptor.descriptorReferences).length > 0
      ) {
        propId = descriptor.descriptorReferences.find(
          x => x.descrptorId === prop.id
        );
      }
      let value = editRow[key];
      list.push({
        Id: propId && propId.id !== "undefined" ? propId.id : 0,
        Answer: value,
        ModuleId: descriptor.moduleId,
        DescriptionReferenceId: descriptor.referenceId,
        DescrptorId: prop.id,
        Descriptor: prop
      });
    }
  }
  if (list.length>0)
    return saveDescriptorReferences(list, null).then(result => {
      dispatch(setDescriptorReferences(result.data));
      return result;
    });
};

const getDescriptors = (moduleId, referenceId) => {
  const params = {
    TakeAll: true,
    moduleId: moduleId,
    referenceId: referenceId
  };
  return descriptorApi.get(params);
};
const getDescriptorReference = referenceId => {
  return descriptorReferenceApi.get({
    referenceId: referenceId
  });
};

const _clearDescriptors = () => dispatch => {
  dispatch(clearDescriptors());
};

export default {
  setModuleId: _setModuleId,
  fechDescriptors: fechDescriptors,
  saveDescriptorReference: saveDescriptorReference,
  clearDescriptors: _clearDescriptors
};
