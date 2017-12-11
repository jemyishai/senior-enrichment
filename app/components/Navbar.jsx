import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink} from 'react-router-dom';

const Navbar = () => {

  return (
<div>
    <NavLink to={"/"}>ALL CAMPUSES </NavLink> |&nbsp;
    <NavLink to={"/students"}>STUDENTS</NavLink> |&nbsp;
    <NavLink to={"/campus/add"}>ADD A CAMPUS</NavLink>
    <hr/>
</div>
  );
}
 export default Navbar;
