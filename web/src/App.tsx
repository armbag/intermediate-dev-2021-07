import * as React from 'react';

import './App.css';

function App() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [authors, setAuthors] = React.useState<any[]>([]);

  // fetching all posts and placing them into a local state
  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + 'posts')
      .then((res) => res.json())
      .then((unsortedPosts) => {
        // before setting them into the state, this will sort them right away so they
        // appear in reverse chronological order
        const sortedPosts = unsortedPosts.sort(
          (previousPost: any, nextPost: any) => {
            return (
              +new Date(nextPost.publishedAt) -
              +new Date(previousPost.publishedAt)
            );
          }
        );
        setPosts(sortedPosts);
      });
  }, []);

  // from the posts get all authors and filter them to not have duplicates
  React.useEffect(() => {
    const allAuthors = posts.map((post) => post.author.name);
    const uniqueAuthors = allAuthors.filter(
      (author, i, self) => self.indexOf(author) === i
    );
    setAuthors(uniqueAuthors);
  }, [posts]);

  // this needs to sort the posts to only display the ones from the author clicked
  function handleClickAuthor(e: any) {
    console.log('filter only ', e.target.innerText, ' posts');
  }

  function formatDate(date: string) {
    const [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);

    return `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
  }

  // 3 list should be from the most recent to the oldest : need to format the date
  // 4 list unique authors, clicking on them should display only their posts

  // 5 title should be clickable to show the formatted (md format) of the body
  // 6 tests
  return (
    <div>
      <h1 className="title">All posts</h1>
      <ul>
        {authors.map((author) => {
          return (
            <li key={author} onClick={handleClickAuthor}>
              {author}
            </li>
          );
        })}
      </ul>
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
                <td>{formatDate(post.publishedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { App };
