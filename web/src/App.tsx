import * as React from 'react';

import './App.css';

function App() {
  const [posts, setPosts] = React.useState<any[]>([]);

  // fetching all posts and placing them into a local state
  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + 'posts')
      .then((res) => res.json())
      .then((json) => {
        setPosts(json);
      });
  }, []);

  // 3 list should be from the most recent to the oldest : need to format the date
  // 4 list unique authors, clicking on them should display only their posts
  // 5 title should be clickable to show the formatted (md format) of the body
  // 6 tests
  return (
    <div>
      <h1 className="title">All posts</h1>
      <table>
        <thead>
          <tr className="table-head">
            <th>Title</th>
            <th>Summary</th>
            <th>Author</th>
            <th>Publish date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>summary</td>
                <td>{post.author.name}</td>
                <td>{post.publishedAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { App };
