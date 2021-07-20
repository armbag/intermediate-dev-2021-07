/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { App } from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.instagram.com">Instagram</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
