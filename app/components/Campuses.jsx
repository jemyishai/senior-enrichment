import React, {Component} from 'react';
import { Route, Switch, Redirect, HashRouter, NavLink } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {deleteCampus, deleteCampusFromDb} from '../reducers'
// import AllStudents from './AllStudents'

function Campuses (props){
    const allCampuses = props.campuses
    return (
        <ul>
        {allCampuses.map(campus =>
        (<li key={campus.id}>
          <NavLink to={`/campus/${campus.id}`}>
            {campus.name}

            <img src={ campus.imageUrl } className="img-fluid img-thumbnail" />
            <p> DESCRIPTION: {campus.description} </p>
            </NavLink>
            <button id={campus.id} className="btn btn-warning" onClick={props.handleClick}
            >REMOVE CAMPUS</button>
            <br/><hr/>
          </li>))
        }
        </ul>
    )
  }



function mapStateToProps(state, ownProps){
  return {
   campuses: state.campuses
  }
}

function mapDispatchToProps (dispatch){
  return {
    handleClick: function(event){
      const campusId = +event.target.id;
      const deleteThunk = deleteCampusFromDb(campusId)
      dispatch(deleteThunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campuses)
