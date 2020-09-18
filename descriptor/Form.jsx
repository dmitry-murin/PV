import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form as ReduxForm, Field, reduxForm } from "redux-form";
import { Row, Col } from "reactstrap";

import InputField from "../../components/common/InputField";
import CheckBoxField from "../../components/common/CheckBoxField";
import LinkField from "../../components/common/LinkField";
import SelectField from "../../components/common/SelectField";
import DatePickerField from "../../components/common/DatePickerField";
import { ComplianseCollapseForm, RiskCollapseForm } from "./component/Collapse";

import { descriptorsOperations } from "./redux";
import TYPE from "./types";
import MODULE_TYPE from "../../moduleType";

const getProperty = (descriptorReferences) => {
  let list = {};
  descriptorReferences.forEach((x) => {
    let key = "prop_" + x.descriptor.id;
    switch (x.descriptor.descriptorType) {
      case TYPE.CHECKBOX: {
        list[key] = x.answer === true;
        break;
      }
      case TYPE.NUMBER: {
        list[key] = parseInt(x.answer);
        break;
      }

      default: {
        list[key] = x.answer;
        break;
      }
    }
  });
  return list;
};

class CustomForm extends React.PureComponent {
  onIntNumberChange = (event, newValue) => {
    if (newValue < 0) {
      event.preventDefault();
    }
  };

  onIntNumberKeyDown = (event) => {
    if (event.key === "." || event.key === "-") {
      event.preventDefault();
    }
  };

  render() {
    const {
      handleSubmit,
      handleComplianceChange,
      onSave,
      descriptors,
    } = this.props;
    const { onIntNumberChange, onIntNumberKeyDown } = this;

    return (
      <ReduxForm
        noValidate
        onSubmit={() => {
          handleSubmit(onSave)();
          handleComplianceChange();
        }}
      >
        {descriptors.map((x, i) => {
          if (!x.reviewAssociation) {
            const fieldProps = {
              label: (
                <span>
                  {x.descriptorQuestion}{" "}
                  {x.applicableForReferenceId && x.includeInCompliance && (
                    <ComplianseCollapseForm question={x.descriptorQuestion} />
                  )}
                  {x.applicableForReferenceId && x.riskAssociation && (
                    <RiskCollapseForm question={x.descriptorQuestion} />
                  )}
                </span>
              ),
              name: "prop_" + x.id.toString(),

              helperText: (
                <span className="helperText">{x.descriptorDesc}</span>
              ),
            };
            const typeProps = (() => {
              switch (x.descriptorType) {
                case TYPE.CHECKBOX:
                  return {
                    component: CheckBoxField,
                  };
                case TYPE.NUMBER:
                  return {
                    //placeholder: x.descriptorQuestion,
                    type: "number",
                    onChange: onIntNumberChange,
                    onKeyDown: onIntNumberKeyDown,
                    component: InputField,
                  };
                case TYPE.TEXT:
                  return {
                    type: "text",
                    component: InputField,
                  };
                case TYPE.LINK:
                  return {
                    type: "text",
                    component: LinkField,
                  };
                case TYPE.SELECT:
                  return {
                    type: "text",
                    component: SelectField,
                    options: x.descriptorConditions.map((x) => {
                      return {
                        value: x.conditionValue,
                        label: x.conditionValue,
                      };
                    }),
                  };
                case TYPE.DATE:
                  return {
                    type: "text",
                    component: DatePickerField,
                  };
                default: {
                }
              }
            })();
            return (
              <Row key={i}>
                <Col lg={12}>
                  <Field {...fieldProps} {...typeProps} />
                </Col>
              </Row>
            );
          }
        })}
      </ReduxForm>
    );
  }
}

CustomForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { descriptor } = state;
  return {
    form: MODULE_TYPE.getForm(descriptor.moduleId),
    descriptors: descriptor.descriptors,
    initialValues: getProperty(descriptor.descriptorReferences),
  };
}
const mapDispatchToProps = {
  onSave: descriptorsOperations.saveDescriptorReference,
};

CustomForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ enableReinitialize: true })(CustomForm));

export default CustomForm;
