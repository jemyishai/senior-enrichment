/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import axios from 'axios'

const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_STUDENT = 'DELETE_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const UPDATE_STUDENT ='UPDATE_STUDENT';
const UPDATE_CAMPUS ='UPDATE_CAMPUS';



const initialState = {
  students: [],
  campuses: []
}

export function getStudents(students){
  const action = {type: GET_STUDENTS, students}
  return action;
}
export function deleteStudent(studentId){
  const action = {type: DELETE_STUDENT, studentId}
  return action;
}

//could get rid of it with multiple dispatches
export function deleteCampus(campusId){
  const action = {type: DELETE_CAMPUS, campusId}
  return action;
}

export function addCampus(campusObj){
  const action = {type: ADD_CAMPUS, campusObj}
  return action;
}

export function addStudent(studentObj){
  const action = {type: ADD_STUDENT, studentObj}
  return action;
}

export function getCampuses(campus){
  const action = {type: GET_CAMPUSES, campus}
  return action;
}

export function updateStudent (student){
  const action = {type: UPDATE_STUDENT, student}
  return action;
}
export function updateCampus (campus){
  const action = {type: UPDATE_CAMPUS, campus}
  return action;
}


export function addStudentAxios(studentObj){
  return function thunk (dispatch){
    return axios.post('/api/students', studentObj)
    .then(res => res.data)
    .then(createdStudent => {
      const action = addStudent(createdStudent)
      dispatch(action)
    })
  }
}

export function addCampusAxios(campusObj){
  return function thunk (dispatch){
    return axios.post('/api/campuses', campusObj)
    .then(res => res.data)
    .then(createdCampus => {
      const action = addCampus(createdCampus)
      dispatch(action)
    })
  }
}

export function fetchStudents (){
  return function thunk (dispatch){
    return axios.get('/api/students')
    .then(res => res.data)
    .then(allStuds => {
      const action = getStudents(allStuds);
      dispatch(action)
    })
  }
}

export function fetchCampuses (){
  return function thunk (dispatch){
    return axios.get('/api/campuses')
    .then(res => res.data)
    .then(allCamps => {
      const action = getCampuses(allCamps);
      dispatch(action)
    })
  }
}

export function deleteStudentFromDb(studentId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/students/${studentId}`)
    .then(something => {
      // const action = deleteStudent(studentId)
      dispatch(fetchStudents())
    })
  }
}

export function deleteCampusFromDb(campusId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
    .then(something => {
      // const action = deleteCampus(campusId)
      dispatch(fetchCampuses())
      // to rerender in the event of deleted campus for students without cmapus
      dispatch(fetchStudents())
    })
  }
}

export function StudentUpdateAxios (updatedStudentObj, studentId){
  return function thunk (dispatch){
    return axios.put(`/api/students/${studentId}`,updatedStudentObj)
      .then(response => response.data)
      .then(updatedStudent => {
        const action = updateStudent(updatedStudent)
        dispatch(action)
      })
  }
}

export function CampusUpdateAxios (updatedCampusObj, campusId){
  return function thunk (dispatch){
    return axios.put(`/api/campuses/${campusId}`, updatedCampusObj)
      .then(response => response.data)
      .then(updatedCampus => {
        const action = updateCampus(updatedCampus)
        dispatch(action)
      })
  }
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDENTS:
    return Object.assign({}, state, {students: action.students})
    case GET_CAMPUSES:
    return Object.assign({}, state, {campuses: action.campus})

    case ADD_STUDENT:
    return Object.assign({}, state, {students: [...state.students, action.studentObj]})

    case DELETE_STUDENT:
      const arrWithoutStudent = state.students.filter(student => {
        return student.id !== action.studentId
      })
      return Object.assign({}, state, {students: arrWithoutStudent})

    case DELETE_CAMPUS:
      const arrWithoutCampus =
      state.campuses.filter(campus => {
        return campus.id !== action.campusId
      })
      return Object.assign({}, state, {campuses: arrWithoutCampus})

    case UPDATE_STUDENT:
    const arrWithoutUpdatedStudent = state.students.filter(student => {
      return student.id !== action.student.id
    })
      return Object.assign({}, state, {students: [...arrWithoutUpdatedStudent, action.student]})

      case UPDATE_CAMPUS:
      const arrWithoutUpdatedCampus = state.campuses.filter(campus => {
        return campus.id !== action.campus.id
      })
        return Object.assign({}, state, {campuses: [...arrWithoutUpdatedCampus, action.campus]})


      case ADD_CAMPUS:
      return Object.assign({}, state, {campuses: [...state.campuses, action.campusObj]})


    default: return state
  }
};




export default rootReducer
