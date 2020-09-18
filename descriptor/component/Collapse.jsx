import React from "react";
import Tooltip from "../../../components/common/Tooltip";
import ComplianceIcon from "mdi-react/AlertCircleIcon";
import RiskIcon from "mdi-react/AlphaRCircleIcon";
const ComplianseCollapse = ({ question, hasValue }) => {
  return (
    <Tooltip
      arrow={true}
      placement="top"
      title={
        <h6>
          Your Compliance policy requires <b>{question} </b> to be populated
        </h6>
      }
    >
      <span>
        {!hasValue && <ComplianceIcon style={{ fill: "#ff4861" }} size="14" />}
      </span>
    </Tooltip>
  );
};

const RiskCollapse = ({ question, hasValue }) => {
  return (
    <Tooltip
      arrow={true}
      placement="top"
      title={
        <h6>
          <b>{question} </b> is included in Risk calcuation and will impact
          (RRS) Relationship Risk Score
        </h6>
      }
    >
      <span>
        <RiskIcon
          style={{ fill: hasValue ? "#ff4861" : "#4ce1b6" }}
          size="14"
        />
      </span>
    </Tooltip>
  );
};
const ComplianseCollapseForm = ({ question, hasValue }) => {
  return (
    <Tooltip
      arrow={true}
      placement="top"
      title={
        <h6>
          Your Compliance policy requires <b>{question} </b> to be populated
        </h6>
      }
    >
      <span>
        {!hasValue && <ComplianceIcon style={{ fill: "#ff4861" }} size="16" />}
      </span>
    </Tooltip>
  );
};
const RiskCollapseForm = ({ question, hasValue }) => {
  return (
    <Tooltip
      arrow={true}
      placement="top"
      title={
        <h6>
          <b>{question} </b> is included in Risk calcuation and will impact
          (RRS) Relationship Risk Score
        </h6>
      }
    >
      <span>
        <RiskIcon style={{ fill: "#ff4861" }} size="16" />
      </span>
    </Tooltip>
  );
};
export {
  ComplianseCollapse,
  RiskCollapse,
  ComplianseCollapseForm,
  RiskCollapseForm,
};
