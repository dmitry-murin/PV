import axios from "axios";
import restApi from "../../utils/restApi";

export const descriptorApi = restApi("/api/Descriptor");
export const descriptorReferenceApi = restApi("/api/DescriptorReference");

export const saveDescriptorReferences = async (model, callback) => {
  return await axios.post("/api/DescriptorReference/save", model, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
