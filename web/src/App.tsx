import * as React from 'react';

import './App.css';

function App() {
  const [allPosts, setAllPosts] = React.useState<any[]>([]);
  const [authors, setAuthors] = React.useState<any[]>([]);
  const [postsFromAuthor, setPostsFromAuthor] = React.useState<any[]>([]);

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
        setAllPosts(sortedPosts);
      });
  }, []);

  // from all the posts get all authors and filter them to not have duplicates
  React.useEffect(() => {
    const allAuthors = allPosts.map((post) => post.author.name);
    const uniqueAuthors = allAuthors.filter(
      (author, i, self) => self.indexOf(author) === i
    );
    setAuthors(uniqueAuthors);
  }, [allPosts]);

  // this needs to sort the posts to only display the ones from the author clicked
  function handleClickAuthor(e: any) {
    const authorClicked = e.target.innerText;
    // get all posts from that author
    const authorsPosts = allPosts.filter((post) => {
      return post.author.name === authorClicked;
    });
    // set it into the corresponding state to display them afterwards
    setPostsFromAuthor(authorsPosts);
  }

  function formatDate(date: string) {
    const [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
    return `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
  }

  // 5 title should be clickable to show the formatted (md format) of the body
  // 6 tests

  // this will insert the needed table body depending if an author has been clicked or not
  function displayPosts(postsToDisplay: any) {
    return postsToDisplay.map((post: any) => {
      return (
        <tr key={post.id}>
          <td>{post.title}</td>
          <td>summary</td>
          <td>{post.author.name}</td>
          <td>{formatDate(post.publishedAt)}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <h1 className="title">All posts</h1>
      <ul>
        <li
          onClick={() => {
            setPostsFromAuthor([]);
          }}
        >
          All posts
        </li>
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
          {postsFromAuthor.length
            ? displayPosts(postsFromAuthor)
            : displayPosts(allPosts)}
        </tbody>
      </table>
    </div>
  );
}

export { App };
