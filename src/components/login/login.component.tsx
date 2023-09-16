import {
  GoogleButton,
  GoogleAuthConsumer,
  IAuthorizationOptions,
  isLoggedIn,
  createOAuthHeaders,
  logOutOAuthUser,
  GoogleAuth,
  IOAuthState,
} from "react-google-oauth2";
import {

} from "react-google-oauth2";

const LoginComponent = () => {
  console.log(process.env.REACT_APP_GOOGLE_APP_ID)
  const options: IAuthorizationOptions = {
    clientId: (process.env.REACT_APP_GOOGLE_APP_ID as string),
    // redirectUri: "http://localhost:3000",
    redirectUri: "http://localhost:5000/google_login",
    scopes: ["openid", "profile", "email"],
    includeGrantedScopes: true,
    accessType: "offline",
  };

  return (
    <div>
      <GoogleAuth>
        <GoogleAuthConsumer>
          {
            (
              { responseState, isAuthenticated }: IOAuthState) => {
              if (!isAuthenticated) {
                return <GoogleButton
                  placeholder="demo/search.png" // Optional
                  options={options}
                  apiUrl="http://localhost:5000/google_login2"
                  defaultStyle={true} // Optional
                  displayErrors={true}>Sign in with google</GoogleButton>;
              } else {
                return <div><h1>Logged In!</h1><h1><code>{JSON.stringify(responseState)}</code></h1></div>;
              }
            }}
        </GoogleAuthConsumer>
      </GoogleAuth>
    </div>
  );

}

export default LoginComponent;