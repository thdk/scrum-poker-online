declare let process : {
  env: {
    PUBLIC_URL: string;
    NODE_ENV: 'test' | 'development' | 'production';
    REACT_APP_FIREBASE_API_KEY: string;
    REACT_APP_FIREBASE_PROJECT_ID: string;
    REACT_APP_FIREBASE_AUTH_DOMAIN: string;
  }
};
