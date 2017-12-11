import React, {Component} from 'react';
import {  NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteStudent, deleteStudentFromDb, CampusUpdateAxios} from '../reducers'



function SingleCampus(props){
    const allStudents = props.students
    const campusId = props.campusId
    const studentsAtThisCampus = allStudents.filter(student => {
      return student.campusId == campusId
    })
    const thisCampus = props.campuses.find(campus => {
      return campus.id == campusId
    })

    if (studentsAtThisCampus.length > 0 && thisCampus) {
      return (
        <div>
        <h2>{thisCampus.name} Campus</h2>
        <h4>DESCRIPTION: {thisCampus.description}</h4>
        <img src={ thisCampus.imageUrl } className="img-fluid img-thumbnail" />
          <div>
          <table className="table">
          <thead>
            <tr>
            <th scope="col">STUDENT ID</th>
            <th scope="col">NAME</th>
            <th scope="col">GPA</th>
            <th scope="col">REMOVE</th>
            </tr>
            </thead>
            <tbody>
          {studentsAtThisCampus.map(student =>
            (

              <tr key={student.id}>
              <td> ID: {student.id} </td>
                <td>
                  <NavLink to={`/students/${student.id}`}> {student.name}
                  </NavLink>
                 </td>
                <td>{student.gpa}</td>
                <td>
                <button id={student.id} className="btn btn-warning" onClick={props.handleClick}
                >REMOVE STUDENT</button>
                </td>
               </tr>
              ))
            }
            </tbody>
            </table>
          </div>
        <div />



        <div className="well">
        <form id={campusId} className="form-horizontal" onSubmit={props.handleSubmit}>
          <fieldset>

            <div className="form-group">
              <label htmlFor="campus" className="col-xs-2 control-label">UPDATE A CAMPUS</label>
              <div className="col-xs-10">
                Name:
                <input type="text" name="name" className="form-control"/>
                DESCRIPTION:
                <input type="text" name="description" className="form-control"/>
                IMAGE URL:
                <input type="text" name="imageUrl" className="form-control"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" >UPDATE CAMPUS</button>
              </div>

            </div>
          </fieldset>
        </form>
      </div>


      </div>
       )
    } else {
      return <div>NO STUDENTS CURRENTLY ATTEND THIS CAMPUS</div>
    }

  }

function mapStateToProps (state, ownProps){
  return {
    campuses: state.campuses,
    students: state.students,
    campusId: ownProps.match.params.campusId
  }
}

function mapDispatchToProps (dispatch){
  return {
    handleClick: function(event) {
      const studentId = +event.target.id
      const deleteThunk = deleteStudentFromDb(studentId)
      dispatch(deleteThunk)
    },
    handleSubmit: (event) => {
      event.preventDefault();
      const updatedCampusObj = {
        name: event.target.name.value,
        description: event.target.description.value,
        imageUrl: event.target.imageUrl.value,
        }
        const campusId = +event.target.id
        const updateCampusThunk = CampusUpdateAxios(updatedCampusObj, campusId)
        dispatch(updateCampusThunk)
      }
  }
}


 export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
