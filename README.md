# Home Expenses Frontend

## References

- <https://github.com/psyrus/react-intro/blob/master/monsters-rolodex/src/App.js>
- <https://github.com/psyrus/react-intro/blob/1cb1748c6b9219b7ef15357d16f39f288096c64a/crwn-clothing/src/App.js>

## Run Guide

1. Ensure that the latest version of LTS NodeJS is installed: <https://nodejs.org/en/download>
2. Run `npm install` from the root directory of the repository
3. Ensure that you have a `.env` file with the following lines

   ```env
   BROWSER=none
   REACT_APP_API_ENDPOINT=http://localhost:5000
   REACT_APP_OAUTH_CLIENT_ID=<Google client app ID>
   ```
4. Depending on your operating system, the system should be started in a different way
   1. Windows: Use the `Webserver+Browser (windows)` Debugger
   2. Linux/MacOS: Use the `Webserver+Browser (unix)` Debugger

> Note: Most functionality will require that the backend server (flask application run through home-expenses-backend) is actively running.
