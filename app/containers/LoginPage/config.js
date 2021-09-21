// import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    // clientId: '1220f39f-17c8-4cee-8a54-555477c731ff',
    // authority:
    //   'https://login.microsoftonline.com/teststorelogin.onmicrosoft.com',
    // knownAuthorities:
    //   "https://login.microsoftonline.com/teststorelogin.onmicrosoft.com".split(','),
    // redirectUri: 'http://localhost:3000/',
    // postLogoutRedirectUri: 'http://localhost:3000/',
    clientId: process.env.REACT_APP_ADB2C_CLIENT_ID,
    authority: process.env.REACT_APP_ADB2C_AUTHORITY,
    // knownAuthorities: process.env.REACT_APP_ADB2C_KNOWN_AUTHORITIES.split(','),
    redirectUri: process.env.REACT_APP_ADB2C_REDIRECT_URI,
    postLogoutRedirectUri: process.env.REACT_APP_ADB2C_POST_LOGOUT_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      // loggerCallback: (level, message, containsPii) => {
      // if (containsPii) {
      //   return;
      // }
      // switch (level) {
      //   case LogLevel.Error:
      //     console.error(message);
      //     return;
      //   case LogLevel.Info:
      //     console.info(message);
      //     return;
      //   case LogLevel.Verbose:
      //     console.debug(message);
      //     return;
      //   case LogLevel.Warning:
      //     console.warn(message);
      // }
      // },
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['user.read'],
};

export const editProfile = {
  authority: 'https://login.microsoftonline.com/teststorelogin.onmicrosoft.com',
};

// export const policyNames = {
//   signUpSignIn: process.env.REACT_APP_ADB2C_SIGNUP_SIGNIN_POLICY,
// };
