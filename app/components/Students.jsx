import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteStudentFromDb } from "../reducers";

function Students(props) {
  const allStudents = props.students;
  if (allStudents.length > 0) {
    return (
      <div>
        <h3>
          All STUDENTS |&nbsp;
          <NavLink to={"/student/add"}>ADD A STUDENT</NavLink>
        </h3>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STUDENT ID</th>
                <th scope="col">NAME</th>
                <th scope="col">GPA</th>
                <th scope="col">CAMPUS</th>
                <th scope="col">REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map(student => (
                <tr key={student.id}>
                  <td> ID: {student.id} </td>
                  <td>
                  {student.email}
                   </td>
                  <td>
                    <NavLink to={`/students/${student.id}`}>
                      {" "}
                      {student.name}
                    </NavLink>
                  </td>
                  <td>{student.gpa}</td>
                 { student.campus ?
                    <td> <NavLink to={`/campus/${student.campusId}`}>
                    {student.campus.name}
                    </NavLink> </td>
                                    : <td>This student has no campus </td> }


                  <td>
                    <button
                      id={student.id}
                      className="btn btn-warning"
                      onClick={props.handleClick}
                    >
                      REMOVE STUDENT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div />
      </div>
    );
  } else {
    return <div>NO STUDENTS CURRENTLY ATTEND THIS CAMPUS</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    students: state.students
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: function(event) {
      const studentId = +event.target.id;
      const deleteThunk = deleteStudentFromDb(studentId);
      dispatch(deleteThunk);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);
