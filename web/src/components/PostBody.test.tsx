/* eslint-env jest */
import ReactDOM from 'react-dom';
import PostBody from './PostBody';

test('PostBody renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PostBody content="# sdfasdfasdfasd" />, div);
});
