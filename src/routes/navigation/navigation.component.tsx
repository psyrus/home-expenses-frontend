import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div>This is my navigation, supposedly</div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;