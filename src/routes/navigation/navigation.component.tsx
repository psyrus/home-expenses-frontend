import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext, UserContextType } from "../../contexts/user.context";


type NavigationItem = {
  route: string,
  description: string,
  requiresLogin?: boolean,
}

const Navigation = () => {

  const { currentUser } = useContext(UserContext) as UserContextType;
  const currentPath: string = window.location.pathname

  const googleEndpoint = "https://accounts.google.com/o/oauth2/v2/auth"
  const options = {
    redirect_uri: `${process.env.REACT_APP_API_ENDPOINT}/login/callback` as string,
    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: `${window.location.origin}/auth?route_to=${currentPath}`,
  };

  const qs = new URLSearchParams(options);

  const loginUrl = `${googleEndpoint}?${qs.toString()}`;

  const navigationItems: NavigationItem[] = [
    {
      route: "/",
      description: "Create Expense",
      requiresLogin: true,
    },
    {
      route: "/expenses",
      description: "View Expenses",
      requiresLogin: true,
    },
    {
      route: "/groups",
      description: "Groups",
      requiresLogin: true,
    },
  ];

  const handleLogout = () => {
    alert("Logout currently not implemented");
  };

  return (
    <Fragment>
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span className="fs-4">Home Expenses Tracker</span>
          </Link>
          <ul className="nav nav-pills">
            {navigationItems.map((navItem: NavigationItem, index: number) => {
              if (!currentUser && navItem.requiresLogin) {
                return;
              }
              return (
                <li key={index} className="nav-item">
                  <Link to={navItem.route} className={navItem.route === currentPath ? "nav-link active" : "nav-link"}>{navItem.description}</Link>
                </li>
              )
            })}
            {currentUser ? <Fragment><li className="navbar-text"><span className="">{currentUser.email}</span></li><li className="nav-item"><a href="#" className="nav-link" onClick={handleLogout}>Logout</a></li></Fragment> : <li className="nav-item"><Link to={loginUrl} className="nav-link">Login</Link></li>}
          </ul>
        </header>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
