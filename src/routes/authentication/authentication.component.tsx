import { Fragment, useContext, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { UserContext, UserContextType } from "../../contexts/user.context";
import ApiClient from "../../utils/backend-api";

const AuthenticationHandler = () => {
  const [searchParams] = useSearchParams();
  const routePath = searchParams.get("route_to") ?? "/";
  const navigator = useNavigate();
  const { updateUser } = useContext(UserContext) as UserContextType;
  const { currentUser } = useContext(UserContext) as UserContextType;
  /**
   * Using the JWT, request the user's information from the API
   * This should provide all of the information that is required for an IUser type
   * Initiate the user with updateUser
   * Redirect to home (this should probably redirect to wherever the user came from originally)
   */

  useEffect(() => {
    const token: string = searchParams.get("token") as string;
    const client = new ApiClient(token)

    client.getCurrentUser().then((userJson: any) => {
      updateUser({
        email: userJson.email,
        id: userJson.id,
        name: userJson.username,
        token: token,
        apiClient: client,
      });
    });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    navigator(routePath);
  }, [currentUser]);

  return <Fragment></Fragment>
}

export default AuthenticationHandler;
