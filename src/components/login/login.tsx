import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthenticatedUser } from '../../modules/auth';

export const Login = () => {
  const user = useAuthenticatedUser();
  const history = useHistory();

  const [requireLogin, setRequireLogin] = useState(false);

  React.useEffect(
    () => {
      if (user) {
        setRequireLogin(false);
        history.push(
          user.session
            ? '/game'
            : '/settings',
        );
      } else if (user === null) {
        setRequireLogin(true);
      }
    },
    [
      history,
      user,
    ],
  );

  React.useEffect(
    () => {
      if (!requireLogin) {
        return;
      }

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
      const loginUi = (
        firebaseui.auth.AuthUI.getInstance()
        || new firebaseui.auth.AuthUI(firebase.auth())
      );

      // The start method will wait until the DOM is loaded.
      loginUi.start('#firebaseui-auth-container', loginUiConfig);
    },
    [requireLogin],
  );

  if (!requireLogin) {
    return <></>;
  }

  return (
    <div>
      <div id="firebaseui-auth-container" />
    </div>
  );
};
