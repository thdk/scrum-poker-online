import React, { createContext, useState, useEffect } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';

export const FirebaseContext = createContext<FirebaseApp>({} as FirebaseApp);
export const FirebaseProvider = (
  { children }: React.PropsWithChildren<Record<string, unknown>>,
) => {
  const [app, setApp] = useState<FirebaseApp>();

  useEffect(() => {
    // if one env variable exists, read all firebase secrets from process.env
    if (
      process.env.REACT_APP_FIREBASE_API_KEY
    ) {
      setApp(
        initializeApp({
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        }),
      );
    } else {
      // fetch configuration for firebase hosting environment
      fetch('/__/firebase/init.json')
        .then(async (response) => {
          const config = await response.json();

          setApp(initializeApp(config));
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.error('Could not initialise firebase. The app must either be hosted with firebase hosting or you must set the firebase settings in a .env file.');
        });
    }
  }, []);

  return app
    ? (
      <FirebaseContext.Provider value={app}>
        {children}
      </FirebaseContext.Provider>
    )
    : null;
};

export const useFirebase = () => React.useContext(FirebaseContext);
