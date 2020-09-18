import React from "react";
import { connect } from "react-redux";

import EditLineText from "./component/EditLineText";
import { ComplianseCollapse, RiskCollapse } from "./component/Collapse";

import { descriptorsOperations } from "./redux";
import LineEditing from "./../../components/lineEditing/LineEditing";

import Spinner from "./../../components/common/Spinner";
import Panel from "./../../components/Panel";
import TYPE from "./types";
import Tooltip from "./../../components/common/Tooltip";
import HelpIcon from "mdi-react/HelpCircleOutlineIcon";

const getProperty = (descriptorReferences) => {
  let list = {};
  descriptorReferences.forEach((x) => {
    let key = "prop_" + x.descriptor.id;
    switch (x.descriptor.descriptorType) {
      case TYPE.CHECKBOX: {
        list[key] = x.answer === "true";
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

const Descriptor = ({
  isLoading,
  descriptors,
  descriptorReferences,
  screenSection,
  editRowId,
  changeEditRowId,
  saveDescriptorReference,
  handleComplianceChange,
}) => {
  const onCustomSave = async (editRow) => {
    const result = await saveDescriptorReference(editRow);
    handleComplianceChange();
    return result;
  };
  const sectionDescriptors =
    descriptors && descriptors.filter((x) => x.screenSection === screenSection);
  const descriptorReferencesProperty = getProperty(descriptorReferences);
  return (
    <React.Fragment>
      {sectionDescriptors && sectionDescriptors.length > 0 && (
        <Panel className="details" title="">
          {!isLoading ? (
            sectionDescriptors.map((x) => {
              if (!x.reviewAssociation) {
                const hasValue =
                  descriptorReferences &&
                  descriptorReferences.find((val) => val.descrptorId === x.id);
                const id = "prop_" + x.id;
                const editLineText = (
                  <EditLineText
                    typeField={x.descriptorType}
                    label={x.descriptorQuestion}
                    property={descriptorReferencesProperty[id]}
                  />
                );
                return (
                  <div key={x.id} style={{ paddingBottom: "10px" }}>
                    <h4 className="subhead" style={{ opacity: "0.6" }}>
                      {x.descriptorQuestion}{" "}
                      {x.applicableForReferenceId && x.includeInCompliance && (
                        <ComplianseCollapse
                          question={x.descriptorQuestion}
                          hasValue={hasValue}
                        />
                      )}
                      {x.applicableForReferenceId && x.riskAssociation && (
                        <RiskCollapse
                          question={x.descriptorQuestion}
                          hasValue={hasValue}
                        />
                      )}
                      <Tooltip
                        placement="top"
                        arrow={true}
                        title={x.descriptorDesc}
                      >
                        <span>
                          {x.descriptorDesc && (
                            <HelpIcon style={{ fill: "#c88ffa" }} size="12" />
                          )}
                        </span>
                      </Tooltip>
                    </h4>
                    <LineEditing
                      id={id}
                      editRow={true}
                      editLineText={editLineText}
                      changeEditRowId={changeEditRowId}
                      label={x.descriptorQuestion}
                      typeField={TYPE.getStringValue(x.descriptorType)}
                      editRowId={editRowId}
                      initialValues={descriptorReferencesProperty}
                      onSave={onCustomSave}
                      icon={x.descriptorName}
                      options={
                        x.descriptorConditions
                          ? x.descriptorConditions.map((x) => {
                              return {
                                value: x.conditionValue,
                                label: x.conditionValue,
                              };
                            })
                          : []
                      }
                    />
                  </div>
                );
              }
            })
          ) : (
            <Spinner />
          )}
        </Panel>
      )}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.descriptor.isDescriptorsLoading,
    descriptors: state.descriptor.descriptors,
    descriptorReferences: state.descriptor.descriptorReferences,
  };
}
const mapDispatchToProps = {
  saveDescriptorReference: descriptorsOperations.saveDescriptorReference,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Descriptor);
