const descriptorTypesEnum = {
  CHECKBOX: 1,
  NUMBER: 2,
  TEXT: 3,
  LINK: 4,
  SELECT: 5,
  DATE: 6,
};

descriptorTypesEnum.getStringValue = (type) => {
  switch (type) {
    case 1:
      return "checkbox";
    case 2:
      return "number";
    case 3:
      return "text";
    case 4:
      return "link";
    case 5:
      return "select";
    case 6:
      return "date";
    default:
      return "";
  }
};

descriptorTypesEnum.getForm = (moduleId) => "custom_contact_form";
export default Object.freeze(descriptorTypesEnum);
