import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
import { AppStore } from "./modules/app/store";

import firebase from "firebase/app";
import "firebase/auth";

const createStore = () => {
	const store = new AppStore({
		firestore: firebase.firestore(),
		auth: firebase.auth(),
	});

	// for development purposes only
	if (process.env.NODE_ENV !== "production") {
		(window as any)["store"] = store;
	}

	return store;
};

export type Store = ReturnType<typeof createStore>;

export const StoreContext = React.createContext(createStore());

const urlParams = new URLSearchParams(window.location.search);

const sessionFromUrl = urlParams.get("session");

ReactDOM.render(<App 
	sessionFromUrl={sessionFromUrl || undefined}
/>, document.getElementById("root"));

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
