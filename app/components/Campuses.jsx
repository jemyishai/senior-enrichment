import React, {Component} from 'react';
import { Route, Switch, Redirect, HashRouter, NavLink } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {deleteCampus, deleteCampusFromDb} from '../reducers'


function Campuses (props){
    const allCampuses = props.campuses
    return (
      <div>
      <table className="table">
      <thead>
        <tr>
        <th scope="col">CAMPUS PAGE</th>
        <th scope="col">IMAGE</th>
        <th scope="col">DESCRIPTION</th>
        <th scope="col">REMOVE</th>
        </tr>
      </thead>
      <tbody>

        {allCampuses.map(campus =>
        (<tr key={campus.id}>
          <NavLink to={`/campus/${campus.id}`}>
            <td>{campus.name}</td></NavLink>

            <td><img src={ campus.imageUrl } className="img-fluid img-thumbnail" /></td>
            <td> DESCRIPTION: {campus.description} </td>

            <td><button id={campus.id} className="btn btn-warning" onClick={props.handleClick}
            >REMOVE CAMPUS</button></td>
          </tr>))
        }
        </tbody>
        </table>
        </div>
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
