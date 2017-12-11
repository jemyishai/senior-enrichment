import React, { Component } from "react";
import { Route, Switch, Redirect, HashRouter, NavLink } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { addCampusAxios } from "../reducers";

function CampusAdd(props) {
  return (
    <div className="well">
      <form onSubmit={props.handleSubmit} className="form-horizontal">
        <fieldset>
          <legend>Add A Campus</legend>
          <div>
            <div>
              NAME<input type="text" name="name" className="form-control" />
              IMAGE URL<input
                type="text"
                name="imageUrl"
                className="form-control"
              />
              DESCRIPTION<input
                type="text"
                name="description"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div>
              <button type="submit" className="btn btn-success">
                Add Campus
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleSubmit: event => {
      event.preventDefault();
      const newCampusObj = {
        name: event.target.name.value,
        imageUrl: event.target.imageUrl.value,
        description: event.target.description.value
      };
      const newCampusThunk = addCampusAxios(newCampusObj, ownProps.history);
      dispatch(newCampusThunk);
    }
  };
}

export default connect(null, mapDispatchToProps)(CampusAdd);
