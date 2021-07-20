/* eslint-env jest */
import ReactDOM from 'react-dom';
import Table from './Table';

test('Table renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Table
      allPosts={[]}
      postsFromAuthor={[]}
      handleSelectedTitle={(params: any) => {
        return null;
      }}
    />,
    div
  );
});
