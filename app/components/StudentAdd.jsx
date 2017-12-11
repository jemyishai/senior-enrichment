import React, { Component } from "react";
import { Route, Switch, Redirect, HashRouter, NavLink } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { addStudentAxios } from "../reducers";
// import {addCampus, addToCampusDb} from '../reducers'

function StudentAdd(props) {
  if (props.campuses.length > 0) {
    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
          <fieldset>
            <div className="form-group">
              <label htmlFor="campus">
                ADD A STUDENT
              </label>
              <div className="col-xs-10">
                First Name:
                <input type="text" name="firstName" className="form-control" />
                Last Name:
                <input type="text" name="lastName" className="form-control" />
                EMAIL:
                <input type="email" name="email" className="form-control" />
                GPA:
                <input type="text" name="gpa" className="form-control" />
                <br />
                <select className="form-control" name="campus">
                  <option value="Choose A Campus">Campus Name</option>
                  {props.campuses.map(campus => {
                    return (
                      <option key={campus.id} value={campus.id}>
                        {campus.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div>
                <button type="submit" className="btn btn-success">
                  ADD STUDENT
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  } else {
    return <div>NO CAMPUSES</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    students: state.students,
    campuses: state.campuses
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleSubmit: event => {
      event.preventDefault();
      const newStudentObj = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        gpa: event.target.gpa.value,
        campusId: event.target.campus.value
      };
      const addStudentThunk = addStudentAxios(newStudentObj, ownProps.history);
      dispatch(addStudentThunk);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentAdd);
