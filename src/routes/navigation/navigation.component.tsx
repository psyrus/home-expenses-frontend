import { Fragment } from "react";
import { Outlet } from "react-router-dom";


type NavigationItem = {
  route: string,
  description: string
}

const Navigation = () => {
  const currentPath: string = window.location.pathname

  const navigationItems: NavigationItem[] = [
    {
      route: "/",
      description: "Create Expense"
    },
    {
      route: "/expenses",
      description: "View Expenses"
    },
    {
      route: "/login",
      description: "Login"
    }
  ]

  return (
    <Fragment>
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span className="fs-4">Home Expenses Tracker</span>
          </a>

          <ul className="nav nav-pills">
            {navigationItems.map((navItem: NavigationItem, index: number) => {
              return <li key={index} className="nav-item"><a href={navItem.route} className={navItem.route === currentPath ? "nav-link active" : "nav-link"}>{navItem.description}</a></li>
            })}
          </ul>
        </header>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
