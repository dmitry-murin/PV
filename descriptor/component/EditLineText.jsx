import React, { Fragment } from "react";
import moment from "moment";
import TYPE from "../types";

const EditLineText = ({ typeField, label, property }) => {
  switch (typeField) {
    case TYPE.CHECKBOX:
      return (
        <Fragment>
          {property === true ? (
            <h4>Yes</h4>
          ) : property === false ? (
            <h4>No</h4>
          ) : (
            <h5 className="data-missing">{`No ${label} found`}</h5>
          )}
        </Fragment>
      );
    case TYPE.LINK:
      return property ? (
        <a
          href={"http://" + property}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5 className="truncate" style={{ color: "#0080ff" }}>
            {property}
          </h5>
        </a>
      ) : (
        <h5 className="data-missing">{`No ${label} found`}</h5>
      );
    case TYPE.NUMBER:
    case TYPE.TEXT:
    case TYPE.SELECT:
      return (
        <Fragment>
          {property ? (
            <h5>{property}</h5>
          ) : (
            <h5 className="data-missing">{`No ${label} found`}</h5>
          )}
        </Fragment>
      );
    case TYPE.DATE:
      return (
        <Fragment>
          {property ? (
            <h5>{moment(property).format("Do MMM YY")}</h5>
          ) : (
            <h5 className="data-missing">{`No ${label} found`}</h5>
          )}
        </Fragment>
      );

    default:
      return null;
  }
};

export default EditLineText;
