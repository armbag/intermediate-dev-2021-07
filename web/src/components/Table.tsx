import * as React from 'react';
import { PostI, TableI } from '../@types/types';
import { formatDate } from '../utils/formatDate';
import { getSummary } from '../utils/getSummary';

function Table({ allPosts, postsFromAuthor, handleSelectedTitle }: TableI) {
  function handleClickPostTitle(e: React.MouseEvent<HTMLElement>) {
    const button = e.target as HTMLButtonElement;
    const postTitleSelected = button.innerText;
    const selectedPost = allPosts.find(
      (post: PostI) => post.title === postTitleSelected
    );
    // handleSelectedTitle(selectedPost?.body, selectedPost?.title);
    handleSelectedTitle(selectedPost);
  }

  // this will insert the needed table body depending if an author has been clicked or not
  function displayPosts(postsToDisplay: PostI[]) {
    return postsToDisplay.map((post: PostI) => {
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

  // if posts from authors return an empty array
  // we know we have display all posts
  return (
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
  );
}

export default Table;
