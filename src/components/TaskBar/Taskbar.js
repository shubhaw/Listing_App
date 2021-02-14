import React from 'react';
import './taskbar.css';
import {Route, NavLink} from 'react-router-dom';
import AddNewProd from './Add/AddNewProd';

const Taskbar = (props) => {
  return (
    <div>
      <NavLink to="/addnewprod">
        <button type="button" className="taskbar_button">
          + Add New Product
        </button>
      </NavLink>
      <Route path="/addnewprod" exact component={AddNewProd} />
    </div>
  );
};

export default Taskbar;
