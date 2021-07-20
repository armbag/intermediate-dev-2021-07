import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import './App.css';

function App() {
  const [allPosts, setAllPosts] = React.useState<any[]>([]);
  const [authors, setAuthors] = React.useState<any[]>([]);
  const [postsFromAuthor, setPostsFromAuthor] = React.useState<any[]>([]);
  const [selectedPostBody, setSelectedPostBody] = React.useState<string>('');

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

  function getSummary(body: string) {
    // presuming summary is the first title of the post
    // we split with \n, as it's the first character breaking the title, and we grab first element
    const summary = body.split('\n')[0];
    // we remove the first 2 characters(# and space)
    return summary.slice(2);
  }

  // this needs to sort the posts to only display the ones from the selected author
  function handleClickAuthor(e: React.MouseEvent<HTMLElement>) {
    const authorSelected = e.target as HTMLElement;
    // get all posts from that author
    const authorsPosts = allPosts.filter((post) => {
      return post.author.name === authorSelected.innerText;
    });
    // set it into the corresponding state to display them afterwards
    setPostsFromAuthor(authorsPosts);
  }

  function formatDate(date: string) {
    const [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
    return `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
  }

  function handleClickPost(e: React.MouseEvent<HTMLElement>) {
    const button = e.target as HTMLButtonElement;
    const postTitleSelected = button.innerText;
    const selectedPost = allPosts.find(
      (post) => post.title === postTitleSelected
    );
    setSelectedPostBody(selectedPost.body);
  }

  // this will insert the needed table body depending if an author has been clicked or not
  function displayPosts(postsToDisplay: any) {
    return postsToDisplay.map((post: any) => {
      return (
        <tr key={post.id}>
          <td>
            <button onClick={handleClickPost}>{post.title}</button>
          </td>
          <td>{getSummary(post.body)}</td>
          <td>{post.author.name}</td>
          <td>{formatDate(post.publishedAt)}</td>
        </tr>
      );
    });
  }
  // 6 tests

  return (
    <div className="container">
      <h1 className="title">All posts</h1>
      <ul>
        <li
          onClick={() => {
            setPostsFromAuthor([]);
          }}
          className="author"
        >
          All posts
        </li>
        {authors.map((author) => {
          return (
            <li key={author} onClick={handleClickAuthor} className="author">
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
      <div>
        {selectedPostBody ? (
          <div>
            <ReactMarkdown>{selectedPostBody}</ReactMarkdown>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { App };
