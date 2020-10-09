## Example using [firestorable](https://github.com/thdk/firestorable): Scrum poker online multiplayer

Play scrum poker online with your scrum team. Simply join an existing session or create a new session code and share it with your team members.

See the **source code** of this example or open the [**online demo**](https://scrum-poker-31315.web.app/) of this example.

The main goal of this repo is to demonstrate the use of [firestorable](https://github.com/thdk/firestorable).

![screensot](images/screenshots.gif)

# Contribute

## Setup firebase project
To run your own version of this application, you'll need your own firebase project.

Once you have a firebase project. Link it with this application.

First make sure you are authenticated with firebase.
`firebase login`

Next, use your desired firebase project by running the following in the terminal.
`firebase use --add`

## Available scripts

In the project directory, you can run:

### `npm run emulators`
This will start the firebase **hosting** and **firestore** emulator.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Builds the app for production and deploys it to firebase hosting site if a site is configured in the firebase console for the project.

### `npm run serve`
Similator to `npm run emulators` but this one will only start the hosting emulator so that firestore request will be made to the real firestore data.