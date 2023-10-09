import { Fragment, MouseEvent } from "react";
import { Outlet } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
// import { useGoogleLogin } from '@react-oauth/google';
import { hasGrantedAllScopesGoogle } from '@react-oauth/google';

type NavigationItem = {
  route: string,
  description: string
  handler?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const Navigation = () => {
  const currentPath: string = window.location.pathname

  // const login = useGoogleLogin({
  //   flow: "implicit",
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  //   onError: tokenResponse => console.log(tokenResponse),
  //   onNonOAuthError: response => console.log(response),
  //   error_callback: tokenResponse => console.log(tokenResponse),
  // });


  const navigationItems: NavigationItem[] = [
    {
      route: "/",
      description: "Create Expense"
    },
    {
      route: "/expenses",
      description: "View Expenses"
    },
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
              return (
                <li key={index} className="nav-item">
                  <a href={navItem.route}
                    className={navItem.route === currentPath ? "nav-link active" : "nav-link"}
                  >
                    {navItem.description}
                  </a>
                </li>
              );
            })}
            {/* <li className="nav-item">
              <a href="" className="nav-link" onClick={() => login()}>Login</a>
            </li> */}
            <li className="nav-item">
              <GoogleLogin
                onSuccess={credentialResponse => {

                  credentialResponse.credential
                  const hasAccess = hasGrantedAllScopesGoogle(
                    credentialResponse,
                    'google-scope-1',
                    'google-scope-2',
                  );
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                theme="filled_black" size="small"

              />;
            </li>
          </ul>
        </header>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
