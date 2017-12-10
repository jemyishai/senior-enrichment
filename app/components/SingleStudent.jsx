import React, {Component} from 'react';
import {  NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteStudent, deleteStudentFromDb, StudentUpdateAxios} from '../reducers'

function SingleStudents(props){
    const allStudents = props.students
    const studentId = props.studentId
    const student = allStudents.find(student => {
      return student.id == studentId
    })
    const studentsCampus = props.campuses.find(campus => {
      return campus.id == student.campusId
    })

    if (student) {
      return (
        <div>
        <h3>{student.name} </h3>
          <div>
          <table className="table">
          <thead>
            <tr>
            <th scope="col">STUDENT ID</th>
            <th scope="col">NAME</th>
            <th scope="col">CAMPUS</th>
            <th scope="col">GPA</th>
            <th scope="col">REMOVE</th>
            </tr>
            </thead>
            <tbody>
              <tr key={student.id}>
              <td> ID: {student.id} </td>
                <td>
                   {student.name}
                 </td>

                 {studentsCampus &&
                  <td> <NavLink to={`/campus/${student.campusId}`}> {studentsCampus.name}
                  </NavLink></td>

                }
                {!studentsCampus &&
                  <td>NO CAMPUS</td>

                }


                <td>{student.gpa}</td>
                <td>
                <button id={student.id} className="btn btn-warning" onClick={props.handleClick}
                >REMOVE STUDENT</button>
                </td>
               </tr>
            </tbody>
            </table>
          </div>
        <div />


        <div className="well">
        <form id={student.id} className="form-horizontal" onSubmit={props.handleSubmit}>
          <fieldset>

            <div className="form-group">
              <label htmlFor="campus" className="col-xs-2 control-label">UPDATE A STUDENT</label>
              <div className="col-xs-10">
              First Name:
                <input type="text" name="firstName" className="form-control"/>
                Last Name:
                <input type="text" name="lastName" className="form-control"/>
                EMAIL:
                <input type="text" name="email" className="form-control"/>
                GPA:
                <input type="text" name="gpa" className="form-control"/>
                <select className="form-control" name="campus">
                <option value="Choose A Campus">Campus Name</option>
                {
                  props.campuses.map(campus => {

                   return  <option key={campus.id} value={campus.id}>{campus.name}</option>
                  })
                }
              </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" >UPDATE STUDENT</button>
              </div>

            </div>
          </fieldset>
        </form>
      </div>


      </div>
            )
    } else {
      return <div>NO INFORMATION ON THIS STUDENT</div>
    }
  }

function mapStateToProps (state, ownProps){
  return {
    students: state.students,
    studentId: ownProps.match.params.studentId,
    campuses: state.campuses
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
      const updatedStudentObj = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        gpa: event.target.gpa.value,
        campusId: event.target.campus.value
        }
        const studentId = +event.target.id
        const updateStudentThunk = StudentUpdateAxios(updatedStudentObj, studentId)
        dispatch(updateStudentThunk)
      }
  }
}


 export default connect(mapStateToProps, mapDispatchToProps)(SingleStudents)
