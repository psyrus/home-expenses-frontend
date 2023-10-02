import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";


const Navigation = () => {
  return (
    <Fragment>
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span className="fs-4">Home Expenses Tracker</span>
          </a>

          <ul className="nav nav-pills">
            <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Create Expense</a></li>
            <li className="nav-item"><a href="#" className="nav-link">View Expenses</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Login</a></li>
          </ul>
        </header>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
