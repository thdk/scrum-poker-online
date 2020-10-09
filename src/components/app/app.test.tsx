import React from 'react';
import { render } from '@testing-library/react';
import App from '.';

import {
  initializeAdminApp,
} from "@firebase/rules-unit-testing";
import { AppStore } from '../../modules/app/store';

const app = initializeAdminApp({
  projectId: "app-test",
});

afterAll(() => {
  app.delete();
});

const mockStore = new AppStore({
  firestore: app.firestore(),
});

jest.mock("../../hooks", () => ({
  useStore: () => mockStore,
}));

test('renders', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
