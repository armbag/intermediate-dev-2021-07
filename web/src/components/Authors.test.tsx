/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import Authors from './Authors';

test('Authors renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Authors
      posts={[]}
      handleAuthorSelection={(params: any) => {
        return null;
      }}
    />,
    div
  );
});
