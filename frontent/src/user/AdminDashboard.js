import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from "../auth";
import { Link } from 'react-router-dom';
//import Sidebar from '../core/Sidebar';
const AdminDashboard = () => {
  const {
    user: { userid, email, usertype,nameoftaxofficial}
  } = isAuthenticated();
  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/list">
              List Of User's
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Add New User
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/user/update">
             Modify User
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
            Refund Application Details
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{nameoftaxofficial}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {usertype === 'admin' ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Layout
      title="Dashboard"
      description={`G'day ${nameoftaxofficial}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>


  )
}

export default AdminDashboard