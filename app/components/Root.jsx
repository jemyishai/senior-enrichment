import React, { Component } from "react";
import {
  Route,
  Switch,
  Redirect,
  HashRouter,
  withRouter
} from "react-router-dom";

import Navbar from "./Navbar";
import { fetchStudents, fetchCampuses } from "../reducers";
import { connect } from "react-redux";
import Campuses from "./Campuses";
import SingleCampus from "./SingleCampus";
import Students from "./Students";
import SingleStudent from "./SingleStudent";
import CampusAdd from "./CampusAdd";
import StudentAdd from "./StudentAdd";

// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// <Sidebar />
// <Navbar />
// <Route path={`/api/students/${student.id}` />

class Root extends Component {
  componentDidMount() {
    this.props.gettingAllData();
  }

  render() {
    return (
      <div>
        <h1>Margaret Hamilton Starfleet Academy</h1>
        <div>
          <Navbar />
          <main>
            <Switch>
              <Route exact path="/" component={Campuses} />
              <Route exact path="/campus" component={Campuses} />
              <Route exact path="/campus/add" component={CampusAdd} />
              <Route exact path="/students" component={Students} />
              <Route exact path="/student/add" component={StudentAdd} />
              <Route
                exact
                path="/students/:studentId"
                component={SingleStudent}
              />
              <Route exact path="/campus/:campusId" component={SingleCampus} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    gettingAllData: function() {
      const gotStudentsThunk = fetchStudents();
      dispatch(gotStudentsThunk);
      const gotCampusesThunk = fetchCampuses();
      dispatch(gotCampusesThunk);
    }
  };
}

export default withRouter(connect(null, mapDispatchToProps)(Root));
