import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import React from 'react';

export const Login = () => {
  React.useEffect(
    () => {
      const loginUiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        signInFlow: 'popup',
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      };

      // Initialize the FirebaseUI Widget using Firebase.
      const loginUi = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      loginUi.start('#firebaseui-auth-container', loginUiConfig);

      return () => {
        loginUi.delete();
      };
    },
    [],
  );

  return (
    <div>
      <div id="firebaseui-auth-container" />
    </div>
  );
};
