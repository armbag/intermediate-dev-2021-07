/* eslint-env jest */
import ReactDOM from 'react-dom';
import Post from './Post';

test('PostBody renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Post title="title" content="# sdfasdfasdfasd" />, div);
});
