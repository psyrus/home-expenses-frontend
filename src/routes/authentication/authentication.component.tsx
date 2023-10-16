import { useContext, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { UserContext, UserContextType } from "../../contexts/user.context";
import ApiClient from "../../utils/backend-api";

const AuthenticationHandler = () => {
  const [searchParams] = useSearchParams();

  const { updateUser } = useContext(UserContext) as UserContextType;

  /**
   * Using the JWT, request the user's information from the API
   * This should provide all of the information that is required for an IUser type
   * Initiate the user with updateUser
   * Redirect to home (this should probably redirect to wherever the user came from originally)
   */

  useEffect(() => {
    const token: string = searchParams.get("token") as string;
    const client = new ApiClient(token)

    console.log("Useeffect ran")
    // I have no idea why the user context doesn't persist: https://github.com/psyrus/react-intro/blob/51065209e1a7454a9a52fbfbb7033b5f72352eff/crwn-clothing/src/contexts/user.context.jsx
    client.getCurrentUser().then((userJson: any) => {
      updateUser({
        email: userJson.email,
        id: userJson.sub,
        name: userJson.name,
        token: token,
        apiClient: client,
      });
    });
  }, []);

  console.log("I was in the auth handler!")
  const routePath = searchParams.get("route_to") ?? "/";
  console.log(`Route Path: ${routePath}`)
  return <Navigate to={routePath} /> // This should navigate to the part sent from searchparams
}

export default AuthenticationHandler;
