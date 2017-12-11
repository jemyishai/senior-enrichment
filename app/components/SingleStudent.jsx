import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteStudent,
  deleteStudentFromDb,
  StudentUpdateAxios
} from "../reducers";

function SingleStudents(props) {
  const allStudents = props.students;
  const studentId = props.studentId;
  const student = allStudents.find(student => {
    return student.id == studentId;
  });
  const studentsCampus = props.campuses.find(campus => {
    return campus.id == student.campusId;
  });

  if (student) {
    return (
      <div>
        <h3>{student.name} </h3>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STUDENT</th>
                <th scope="col">EMAIL</th>
                <th scope="col">STUDENT ID</th>
                <th scope="col">CAMPUS</th>
                <th scope="col">GPA</th>
                <th scope="col">REMOVE</th>
              </tr>
            </thead>
            <tbody>
              <tr key={student.id}>
                <td> {student.name} </td>
                <td>{student.email}</td>
                <td>{student.id}</td>
                {studentsCampus && (
                  <td>
                    {" "}
                    <NavLink to={`/campus/${student.campusId}`}>
                      {" "}
                      {studentsCampus.name}
                    </NavLink>
                  </td>
                )}
                {!studentsCampus && <td>NO CAMPUS</td>}

                <td>{student.gpa}</td>
                <td>
                  <NavLink to={`/students/`}>
                    <button
                      id={student.id}
                      className="btn btn-warning"
                      onClick={props.handleClick}
                    >
                      REMOVE STUDENT
                    </button>
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div />

        <div className="well">
          <form
            id={student.id}
            className="form-horizontal"
            onSubmit={props.handleSubmit}
          >
            <fieldset>
              <div className="form-group">
                <label htmlFor="campus">
                  UPDATE A STUDENT
                </label>
                <div>
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                  />
                  Last Name:
                  <input type="text" name="lastName" className="form-control" />
                  EMAIL:
                  <input type="email" name="email" className="form-control" />
                  GPA:
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="4.0"
                    name="gpa"
                    className="form-control"
                  />
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
                    UPDATE STUDENT
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  } else {
    return <div>NO INFORMATION ON THIS STUDENT</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    students: state.students,
    studentId: ownProps.match.params.studentId,
    campuses: state.campuses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: function(event) {
      const studentId = +event.target.id;
      const deleteThunk = deleteStudentFromDb(studentId);
      dispatch(deleteThunk);
    },
    handleSubmit: event => {
      event.preventDefault();
      const updatedStudentObj = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        gpa: event.target.gpa.value,
        campusId: event.target.campus.value
      };
      const studentId = +event.target.id;
      const updateStudentThunk = StudentUpdateAxios(
        updatedStudentObj,
        studentId
      );
      dispatch(updateStudentThunk);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudents);
