import * as React from 'react';
import PostContent from './components/PostBody';
import Authors from './components/Authors';
import { useAllPosts } from './hooks/useAllPosts';
import { formatDate } from './utils/formatDate';
import { getSummary } from './utils/getSummary';

import './App.css';

function App() {
  const [allPosts, isLoading, error] = useAllPosts();
  const [postsFromAuthor, setPostsFromAuthor] = React.useState<any[]>([]);
  const [selectedPostBody, setSelectedPostBody] = React.useState<string>('');

  function handleAuthorSelection(authorsPosts: any) {
    setPostsFromAuthor(authorsPosts);
  }

  function handleClickPostTitle(e: React.MouseEvent<HTMLElement>) {
    const button = e.target as HTMLButtonElement;
    const postTitleSelected = button.innerText;
    const selectedPost = allPosts.find(
      (post: any) => post.title === postTitleSelected
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
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>An error occured, please try again</p> : null}
      <Authors posts={allPosts} handleAuthorSelection={handleAuthorSelection} />
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
      {selectedPostBody ? <PostContent content={selectedPostBody} /> : null}
    </div>
  );
}

export { App };
