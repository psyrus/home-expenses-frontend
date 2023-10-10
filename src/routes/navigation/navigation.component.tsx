import { Fragment } from "react";
import { Outlet } from "react-router-dom";


type NavigationItem = {
  route: string,
  description: string
}

const Navigation = () => {
  const currentPath: string = window.location.pathname

  const currentUrl = window.location.href;
  const googleEndpoint = "https://accounts.google.com/o/oauth2/v2/auth"
  const options = {
    redirect_uri: "http://localhost:5000/login/callback" as string,
    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: currentUrl,
  };

  const qs = new URLSearchParams(options);

  const loginUrl = `${googleEndpoint}?${qs.toString()}`;

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
      route: loginUrl,
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
