import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useAuthenticatedUser } from '../../modules/auth';
import { useAppStore } from '../../modules/app/use-app-store';

export const Login = () => {
  const user = useAuthenticatedUser();
  const history = useHistory();
  const store = useAppStore();

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

  const { auth } = store;
  const onClick = useCallback(() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(() => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const { email } = error;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }, [
    auth,
  ]);

  if (!requireLogin) {
    return <></>;
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GoogleLoginButton
        onClick={onClick}
        style={{
          height: '30px',
          width: '220px',
        }}
      />
    </div>
  );
};
