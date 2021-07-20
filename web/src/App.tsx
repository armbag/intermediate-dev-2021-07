import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAllPosts } from './hooks/useAllPosts';
import { useAllAuthors } from './hooks/useAllAuthors';
import { formatDate } from './utils/formatDate';

import './App.css';

function App() {
  const allPosts = useAllPosts();
  const authors = useAllAuthors(allPosts);
  const [postsFromAuthor, setPostsFromAuthor] = React.useState<any[]>([]);
  const [selectedPostBody, setSelectedPostBody] = React.useState<string>('');

  function getSummary(body: string) {
    // presuming summary is the first title of the post
    // we split with \n, as it's the first character breaking the title, and we grab first element
    const summary = body.split('\n')[0];
    // we remove the first 2 characters(# and space)
    return summary.slice(2);
  }

  // this will sort the posts to only display the ones from the selected author
  function handleClickAuthor(e: React.MouseEvent<HTMLElement>) {
    const authorSelected = e.target as HTMLElement;
    // get all posts from that author
    const authorsPosts = allPosts.filter((post) => {
      return post.author.name === authorSelected.innerText;
    });
    // set it into the corresponding state to display them afterwards
    setPostsFromAuthor(authorsPosts);
  }

  function handleClickPostTitle(e: React.MouseEvent<HTMLElement>) {
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
            <button onClick={handleClickPostTitle}>{post.title}</button>
          </td>
          <td>{getSummary(post.body)}</td>
          <td>{post.author.name}</td>
          <td>{formatDate(post.publishedAt)}</td>
        </tr>
      );
    });
  }

  return (
    <div className="container">
      <h1 className="title">All posts</h1>
      <ul>
        <li
          onClick={() => {
            setPostsFromAuthor([]);
          }}
          className="author selected"
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
